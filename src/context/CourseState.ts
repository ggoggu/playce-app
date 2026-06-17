import { useEffect, useState } from 'react';
import { COURSE_DATA, CourseNode, CourseThemeType } from '../constants/CourseData';

export type CourseTheme = CourseThemeType | null;

export interface CourseProgressState {
  completedNodes: number[];
  currentNodeIndex: number | null;
  isRFIDDetected: boolean;
}

type CourseProgressMap = Partial<Record<CourseThemeType, CourseProgressState>>;

const TOTAL_PLAYCE_NODES = Object.values(COURSE_DATA).reduce((sum, theme) => sum + theme.totalNodes, 0);

const createEmptyCourseProgressState = (): CourseProgressState => ({
  completedNodes: [],
  currentNodeIndex: null,
  isRFIDDetected: false,
});

const badgeKey = (themeId: CourseThemeType, nodeId: number) => `${themeId}:${nodeId}`;

let globalActiveTheme: CourseTheme = null;
let globalCourseProgressStates: CourseProgressMap = {};
let globalCompletedBadgeKeys: string[] = [];

const listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

const getThemeProgressState = (
  themeId: CourseThemeType,
  courseProgressStates: CourseProgressMap = globalCourseProgressStates,
): CourseProgressState => courseProgressStates[themeId] ?? createEmptyCourseProgressState();

const getNextCourseNode = (
  themeId: CourseThemeType | null,
  courseProgressStates: CourseProgressMap = globalCourseProgressStates,
): CourseNode | null => {
  if (!themeId) {
    return null;
  }

  const themeData = COURSE_DATA[themeId];
  const progressState = getThemeProgressState(themeId, courseProgressStates);

  return (
    themeData.nodes.find(node => node.id === progressState.currentNodeIndex && !progressState.completedNodes.includes(node.id)) ??
    themeData.nodes.find(node => !progressState.completedNodes.includes(node.id)) ??
    null
  );
};

const uniqueBadgeKeys = (badgeKeys: string[], nextKey: string): string[] =>
  badgeKeys.includes(nextKey) ? badgeKeys : [...badgeKeys, nextKey];

const cloneCourseProgressStates = (courseProgressStates: CourseProgressMap): CourseProgressMap =>
  Object.entries(courseProgressStates).reduce<CourseProgressMap>((acc, [themeId, progressState]) => {
    if (!progressState) {
      return acc;
    }

    acc[themeId as CourseThemeType] = {
      completedNodes: [...progressState.completedNodes],
      currentNodeIndex: progressState.currentNodeIndex,
      isRFIDDetected: progressState.isRFIDDetected,
    };
    return acc;
  }, {});

export const useCourse = () => {
  const [activeTheme, setActiveTheme] = useState<CourseTheme>(globalActiveTheme);
  const [courseProgressStates, setCourseProgressStates] = useState<CourseProgressMap>(cloneCourseProgressStates(globalCourseProgressStates));
  const [completedBadgeKeys, setCompletedBadgeKeys] = useState<string[]>([...globalCompletedBadgeKeys]);

  useEffect(() => {
    const listener = () => {
      setActiveTheme(globalActiveTheme);
      setCourseProgressStates(cloneCourseProgressStates(globalCourseProgressStates));
      setCompletedBadgeKeys([...globalCompletedBadgeKeys]);
    };

    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const activeCourseState = activeTheme ? getThemeProgressState(activeTheme, courseProgressStates) : createEmptyCourseProgressState();
  const activeNode = getNextCourseNode(activeTheme, courseProgressStates);
  const completedNodes = activeCourseState.completedNodes;
  const currentNodeIndex = activeCourseState.currentNodeIndex;
  const currentThemeData = activeTheme ? COURSE_DATA[activeTheme] : null;
  const progressPercent = currentThemeData
    ? Math.round((completedNodes.length / Math.max(currentThemeData.totalNodes, 1)) * 100)
    : 0;
  const overallProgressPercent = Math.round(
    (completedBadgeKeys.length / Math.max(TOTAL_PLAYCE_NODES, 1)) * 100,
  );
  const hasJourneyHistory = completedBadgeKeys.length > 0 || Object.keys(courseProgressStates).length > 0;

  const startCourse = (theme: Exclude<CourseTheme, null>) => {
    if (!globalCourseProgressStates[theme]) {
      globalCourseProgressStates = {
        ...globalCourseProgressStates,
        [theme]: createEmptyCourseProgressState(),
      };
    }
    globalActiveTheme = theme;
    notifyListeners();
  };

  const openCourseSelection = () => {
    if (globalActiveTheme) {
      const currentState = getThemeProgressState(globalActiveTheme);
      globalCourseProgressStates = {
        ...globalCourseProgressStates,
        [globalActiveTheme]: {
          ...currentState,
          isRFIDDetected: false,
        },
      };
    }
    globalActiveTheme = null;
    notifyListeners();
  };

  const cancelCourse = () => {
    globalActiveTheme = null;
    globalCourseProgressStates = {};
    globalCompletedBadgeKeys = [];
    notifyListeners();
  };

  const triggerRFID = () => {
    if (!globalActiveTheme) {
      return;
    }

    const nextNode = getNextCourseNode(globalActiveTheme);
    if (!nextNode) {
      globalActiveTheme = null;
      notifyListeners();
      return;
    }

    const currentState = getThemeProgressState(globalActiveTheme);
    globalCourseProgressStates = {
      ...globalCourseProgressStates,
      [globalActiveTheme]: {
        ...currentState,
        currentNodeIndex: nextNode.id,
        isRFIDDetected: true,
      },
    };
    notifyListeners();
  };

  const closeRFID = () => {
    if (!globalActiveTheme) {
      return;
    }

    const currentState = getThemeProgressState(globalActiveTheme);
    globalCourseProgressStates = {
      ...globalCourseProgressStates,
      [globalActiveTheme]: {
        ...currentState,
        isRFIDDetected: false,
      },
    };
    notifyListeners();
  };

  const setCurrentNode = (nodeIndex: number | null) => {
    if (!globalActiveTheme) {
      return;
    }

    const currentState = getThemeProgressState(globalActiveTheme);
    globalCourseProgressStates = {
      ...globalCourseProgressStates,
      [globalActiveTheme]: {
        ...currentState,
        currentNodeIndex: nodeIndex,
      },
    };
    notifyListeners();
  };

  const completeNode = (nodeIndex: number) => {
    if (!globalActiveTheme) {
      return;
    }

    const themeId = globalActiveTheme;
    const currentState = getThemeProgressState(themeId);
    const nextCompletedNodes = currentState.completedNodes.includes(nodeIndex)
      ? currentState.completedNodes
      : [...currentState.completedNodes, nodeIndex];

    globalCompletedBadgeKeys = uniqueBadgeKeys(globalCompletedBadgeKeys, badgeKey(themeId, nodeIndex));

    const nextNode = COURSE_DATA[themeId].nodes.find(node => !nextCompletedNodes.includes(node.id)) ?? null;

    if (nextNode) {
      globalCourseProgressStates = {
        ...globalCourseProgressStates,
        [themeId]: {
          completedNodes: nextCompletedNodes,
          currentNodeIndex: nextNode.id,
          isRFIDDetected: false,
        },
      };
    } else {
      const { [themeId]: _removed, ...remainingThemes } = globalCourseProgressStates;
      globalCourseProgressStates = remainingThemes;
      globalActiveTheme = null;
    }

    notifyListeners();
  };

  return {
    isCourseActive: activeTheme !== null,
    activeTheme,
    activeNode,
    courseProgressStates,
    completedBadgeKeys,
    completedNodes,
    currentNodeIndex,
    isRFIDDetected: activeCourseState.isRFIDDetected,
    rfidPlace: activeCourseState.isRFIDDetected ? activeNode?.placeName ?? null : null,
    progressPercent,
    overallProgressPercent,
    hasJourneyHistory,
    triggerRFID,
    closeRFID,
    startCourse,
    cancelCourse,
    openCourseSelection,
    setCurrentNode,
    completeNode,
  };
};
