import {
  DEFAULT_COLUMNS_SETTINGS,
  DEFAULT_KEYS,
  primaryKey,
} from '../app/utils/constants';

/**
 *Sample data
 */

let maxRows = 20;

export function getMaxRows() {
  return maxRows;
}

export function incMaxRows() {
  maxRows = maxRows + 1;
  return maxRows;
}

export let virtualData: any[] = [];

export function addRowData(newItem, insertingPosition): void {
  virtualData = virtualData
    .slice(0, insertingPosition)
    .concat(newItem)
    .concat(virtualData.slice(insertingPosition));
}

export function dataSource(): void {
  let parent: number = -1;
  let parentId: number;
  let names: string[] = [
    'VINET',
    'TOMSP',
    'HANAR',
    'VICTE',
    'SUPRD',
    'HANAR',
    'CHOPS',
    'RICSU',
    'WELLI',
    'HILAA',
    'ERNSH',
    'CENTC',
    'OTTIK',
    'QUEDE',
    'RATTC',
    'ERNSH',
  ];
  for (let i: number = 0; i < maxRows; i++) {
    if (i % 5 === 0) {
      parent = i;
    }
    const record = DEFAULT_COLUMNS_SETTINGS.reduce((result, column) => {
      return { ...result, [column.field]: null };
    }, {});

    const newRecord = {
      ...record,
      [primaryKey]: i + 1,
      [DEFAULT_KEYS.field]: names[Math.floor(Math.random() * names.length)],
      [DEFAULT_KEYS.year]: 1967 + (i % 10),
      [DEFAULT_KEYS.stint]: Math.floor(Math.random() * 200),
      childs: [],
    };
    if (i % 5 !== 0) {
      let num: number = isNaN((virtualData.length % parent) - 1)
        ? 0
        : (virtualData.length % parent) - 1;
      virtualData[num]['childs'].push({ ...newRecord, parent: parentId });
    } else {
      virtualData.push({ ...newRecord, parent: -1 });
      parentId = i + 1;
    }
  }
}

export let sampleData = [
  {
    ID: 1,
    NAME: 'Planning',
    YEAR: new Date('02/03/2017'),
    endDate: new Date('02/07/2017'),
    STINT: 100,
    duration: 5,
    priority: 'Normal',
    approved: false,
    subtasks: [
      {
        ID: 2,
        NAME: 'Plan timeline',
        YEAR: new Date('02/03/2017'),
        endDate: new Date('02/07/2017'),
        duration: 5,
        STINT: 100,
        priority: 'Normal',
        approved: false,
      },
      {
        ID: 3,
        NAME: 'Plan budget',
        YEAR: new Date('02/03/2017'),
        endDate: new Date('02/07/2017'),
        duration: 5,
        STINT: 100,
        priority: 'Low',
        approved: true,
      },
      {
        ID: 4,
        NAME: 'Allocate resources',
        YEAR: new Date('02/03/2017'),
        endDate: new Date('02/07/2017'),
        duration: 5,
        STINT: 100,
        priority: 'Critical',
        approved: false,
      },
      {
        ID: 5,
        NAME: 'Planning complete',
        YEAR: new Date('02/07/2017'),
        endDate: new Date('02/07/2017'),
        duration: 0,
        STINT: 0,
        priority: 'Low',
        approved: true,
      },
    ],
  },
  {
    ID: 6,
    NAME: 'Design',
    YEAR: new Date('02/10/2017'),
    endDate: new Date('02/14/2017'),
    duration: 3,
    STINT: 86,
    priority: 'High',
    approved: false,
    subtasks: [
      {
        ID: 7,
        NAME: 'Software Specification',
        YEAR: new Date('02/10/2017'),
        endDate: new Date('02/12/2017'),
        duration: 3,
        STINT: 60,
        priority: 'Normal',
        approved: false,
      },
      {
        ID: 8,
        NAME: 'Develop prototype',
        YEAR: new Date('02/10/2017'),
        endDate: new Date('02/12/2017'),
        duration: 3,
        STINT: 100,
        priority: 'Critical',
        approved: false,
      },
      {
        ID: 9,
        NAME: 'Get approval from customer',
        YEAR: new Date('02/13/2017'),
        endDate: new Date('02/14/2017'),
        duration: 2,
        STINT: 100,
        priority: 'Low',
        approved: true,
      },
      {
        ID: 10,
        NAME: 'Design Documentation',
        YEAR: new Date('02/13/2017'),
        endDate: new Date('02/14/2017'),
        duration: 2,
        STINT: 100,
        priority: 'High',
        approved: true,
      },
      {
        ID: 11,
        NAME: 'Design complete',
        YEAR: new Date('02/14/2017'),
        endDate: new Date('02/14/2017'),
        duration: 0,
        STINT: 0,
        priority: 'Normal',
        approved: true,
      },
    ],
  },
  {
    ID: 12,
    NAME: 'Implementation Phase',
    YEAR: new Date('02/17/2017'),
    endDate: new Date('02/27/2017'),
    priority: 'Normal',
    approved: false,
    duration: 11,
    STINT: 66,
    subtasks: [
      {
        ID: 13,
        NAME: 'Phase 1',
        YEAR: new Date('02/17/2017'),
        endDate: new Date('02/27/2017'),
        priority: 'High',
        approved: false,
        STINT: 50,
        duration: 11,
        subtasks: [
          {
            ID: 14,
            NAME: 'Implementation Module 1',
            YEAR: new Date('02/17/2017'),
            endDate: new Date('02/27/2017'),
            priority: 'Normal',
            duration: 11,
            STINT: 10,
            approved: false,
            subtasks: [
              {
                ID: 15,
                NAME: 'Development Task 1',
                YEAR: new Date('02/17/2017'),
                endDate: new Date('02/19/2017'),
                duration: 3,
                STINT: '50',
                priority: 'High',
                approved: false,
              },
              {
                ID: 16,
                NAME: 'Development Task 2',
                YEAR: new Date('02/17/2017'),
                endDate: new Date('02/19/2017'),
                duration: 3,
                STINT: '50',
                priority: 'Low',
                approved: true,
              },
              {
                ID: 17,
                NAME: 'Testing',
                YEAR: new Date('02/20/2017'),
                endDate: new Date('02/21/2017'),
                duration: 2,
                STINT: '0',
                priority: 'Normal',
                approved: true,
              },
              {
                ID: 18,
                NAME: 'Bug fix',
                YEAR: new Date('02/24/2017'),
                endDate: new Date('02/25/2017'),
                duration: 2,
                STINT: '0',
                priority: 'Critical',
                approved: false,
              },
              {
                ID: 19,
                NAME: 'Customer review meeting',
                YEAR: new Date('02/26/2017'),
                endDate: new Date('02/27/2017'),
                duration: 2,
                STINT: '0',
                priority: 'High',
                approved: false,
              },
              {
                ID: 20,
                NAME: 'Phase 1 complete',
                YEAR: new Date('02/27/2017'),
                endDate: new Date('02/27/2017'),
                duration: 0,
                STINT: '50',
                priority: 'Low',
                approved: true,
              },
            ],
          },
        ],
      },
      {
        ID: 21,
        NAME: 'Phase 2',
        YEAR: new Date('02/17/2017'),
        endDate: new Date('02/28/2017'),
        priority: 'High',
        approved: false,
        duration: 12,
        STINT: 60,
        subtasks: [
          {
            ID: 22,
            NAME: 'Implementation Module 2',
            YEAR: new Date('02/17/2017'),
            endDate: new Date('02/28/2017'),
            priority: 'Critical',
            approved: false,
            duration: 12,
            STINT: 90,
            subtasks: [
              {
                ID: 23,
                NAME: 'Development Task 1',
                YEAR: new Date('02/17/2017'),
                endDate: new Date('02/20/2017'),
                duration: 4,
                STINT: '50',
                priority: 'Normal',
                approved: true,
              },
              {
                ID: 24,
                NAME: 'Development Task 2',
                YEAR: new Date('02/17/2017'),
                endDate: new Date('02/20/2017'),
                duration: 4,
                STINT: '50',
                priority: 'Critical',
                approved: true,
              },
              {
                ID: 25,
                NAME: 'Testing',
                YEAR: new Date('02/21/2017'),
                endDate: new Date('02/24/2017'),
                duration: 2,
                STINT: '0',
                priority: 'High',
                approved: false,
              },
              {
                ID: 26,
                NAME: 'Bug fix',
                YEAR: new Date('02/25/2017'),
                endDate: new Date('02/26/2017'),
                duration: 2,
                STINT: '0',
                priority: 'Low',
                approved: false,
              },
              {
                ID: 27,
                NAME: 'Customer review meeting',
                YEAR: new Date('02/27/2017'),
                endDate: new Date('02/28/2017'),
                duration: 2,
                STINT: '0',
                priority: 'Critical',
                approved: true,
              },
              {
                ID: 28,
                NAME: 'Phase 2 complete',
                YEAR: new Date('02/28/2017'),
                endDate: new Date('02/28/2017'),
                duration: 0,
                STINT: '50',
                priority: 'Normal',
                approved: false,
              },
            ],
          },
        ],
      },

      {
        ID: 29,
        NAME: 'Phase 3',
        YEAR: new Date('02/17/2017'),
        endDate: new Date('02/27/2017'),
        priority: 'Normal',
        approved: false,
        duration: 11,
        STINT: 30,
        subtasks: [
          {
            ID: 30,
            NAME: 'Implementation Module 3',
            YEAR: new Date('02/17/2017'),
            endDate: new Date('02/27/2017'),
            priority: 'High',
            approved: false,
            duration: 11,
            STINT: 60,
            subtasks: [
              {
                ID: 31,
                NAME: 'Development Task 1',
                YEAR: new Date('02/17/2017'),
                endDate: new Date('02/19/2017'),
                duration: 3,
                STINT: '50',
                priority: 'Low',
                approved: true,
              },
              {
                ID: 32,
                NAME: 'Development Task 2',
                YEAR: new Date('02/17/2017'),
                endDate: new Date('02/19/2017'),
                duration: 3,
                STINT: '50',
                priority: 'Normal',
                approved: false,
              },
              {
                ID: 33,
                NAME: 'Testing',
                YEAR: new Date('02/20/2017'),
                endDate: new Date('02/21/2017'),
                duration: 2,
                STINT: '0',
                priority: 'Critical',
                approved: true,
              },
              {
                ID: 34,
                NAME: 'Bug fix',
                YEAR: new Date('02/24/2017'),
                endDate: new Date('02/25/2017'),
                duration: 2,
                STINT: '0',
                priority: 'High',
                approved: false,
              },
              {
                ID: 35,
                NAME: 'Customer review meeting',
                YEAR: new Date('02/26/2017'),
                endDate: new Date('02/27/2017'),
                duration: 2,
                STINT: '0',
                priority: 'Normal',
                approved: true,
              },
              {
                ID: 36,
                NAME: 'Phase 3 complete',
                YEAR: new Date('02/27/2017'),
                endDate: new Date('02/27/2017'),
                duration: 0,
                STINT: '50',
                priority: 'Critical',
                approved: false,
              },
            ],
          },
        ],
      },
    ],
  },
];
