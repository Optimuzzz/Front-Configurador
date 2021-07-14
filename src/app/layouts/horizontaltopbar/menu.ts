import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx bxs-dashboard',
        link: '',
    },
    {
        id: 2,
        label: 'Fabricante',
        icon: 'mdi mdi-alarm-panel',
        link: '/create-fabricante',

    },
    // {
    //     id: 3,
    //     label: 'MENUITEMS.ADVANCEDKIT.TEXT',
    //     icon: 'bx bxs-grid me-2',
    //     subItems: [
    //         {
    //             id: 4,
    //             label: 'MENUITEMS.ADVANCEDKIT.LIST.SWEETALERT',
    //             link: '/advanced/sweet-alert',
    //             parentId: 3
    //         },
    //         {
    //             id: 5,
    //             label: 'MENUITEMS.ADVANCEDKIT.LIST.RANGESLIDER',
    //             link: '/advanced/rangeslider',
    //             parentId: 3
    //         },
    //         {
    //             id: 6,
    //             label: 'MENUITEMS.ADVANCEDKIT.LIST.NOTIFICATIONS',
    //             link: '/advanced/notifications',
    //             parentId: 3
    //         },
    //         {
    //             id: 7,
    //             label: 'MENUITEMS.ADVANCEDKIT.LIST.CAROUSEL',
    //             link: '/advanced/carousel',
    //             parentId: 3
    //         }
    //     ]
    // },
    // {
    //     id: 8,
    //     label: 'MENUITEMS.APPS.TEXT',
    //     icon: 'bx bxs-cube-alt me-2',
    //     subItems: [
    //         {
    //             id: 9,
    //             label: 'MENUITEMS.APPS.LIST.CALENDAR',
    //             link: '/apps/calender',
    //             parentId: 8
    //         },
    //         {
    //             id: 10,
    //             label: 'MENUITEMS.APPS.LIST.CHAT',
    //             link: '/apps/chat',
    //             parentId: 8
    //         },
    //         {
    //             id: 11,
    //             label: 'MENUITEMS.APPS.LIST.EMAIL',
    //             badge: {
    //                 variant: 'success',
    //                 text: 'Em',
    //             },
    //             parentId: 8,
    //             subItems: [
    //                 {
    //                     id: 12,
    //                     label: 'MENUITEMS.APPS.LIST.SUB.INBOX',
    //                     link: '/apps/inbox',
    //                     parentId: 11
    //                 },
    //                 {
    //                     id: 13,
    //                     label: 'MENUITEMS.APPS.LIST.SUB.READEMAIL',
    //                     link: '/apps/read/1',
    //                     parentId: 11
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     id: 14,
    //     label: 'MENUITEMS.ADMINKIT.TEXT',
    //     icon: 'bx bx-layer me-2',
    //     subItems: [
    //         {
    //             id: 15,
    //             label: 'MENUITEMS.TYPOGRAPHY.TEXT',
    //             icon: 'bx bx-text',
    //             link: '/typography',
    //             parentId: 14

    //         },
    //         {
    //             id: 16,
    //             label: 'MENUITEMS.FORMS.TEXT',
    //             icon: 'bx bxs-magic-wand',
    //             subItems: [
    //                 {
    //                     id: 17,
    //                     label: 'MENUITEMS.FORMS.LIST.ELEMENTS',
    //                     link: '/form/elements',
    //                     parentId: 16
    //                 },
    //                 {
    //                     id: 18,
    //                     label: 'MENUITEMS.FORMS.LIST.ADVANCED',
    //                     link: '/form/advanced',
    //                     parentId: 16
    //                 }
    //             ]
    //         },
    //         {
    //             id: 19,
    //             label: 'MENUITEMS.TABLES.TEXT',
    //             icon: 'bx bx-table',
    //             subItems: [
    //                 {
    //                     id: 20,
    //                     label: 'MENUITEMS.TABLES.LIST.BASIC',
    //                     link: '/tables/basic',
    //                     parentId: 19
    //                 },
    //                 {
    //                     id: 21,
    //                     label: 'MENUITEMS.TABLES.LIST.ADVANCED',
    //                     link: '/tables/datatable',
    //                     parentId: 19
    //                 }
    //             ]
    //         },
    //         {
    //             id: 22,
    //             label: 'MENUITEMS.CHARTS.TEXT',
    //             icon: 'bx bx-doughnut-chart',
    //             link: '/charts',

    //         },
    //         {
    //             id: 23,
    //             label: 'MENUITEMS.ICONS.TEXT',
    //             icon: 'bx bx-layer',
    //             subItems: [
    //                 {
    //                     id: 24,
    //                     label: 'MENUITEMS.ICONS.LIST.BOXICONS',
    //                     link: '/icons/boxicons',
    //                     parentId: 23
    //                 },
    //                 {
    //                     id: 25,
    //                     label: 'MENUITEMS.ICONS.LIST.MATERIALDESIGN',
    //                     link: '/icons/materialdesign',
    //                     parentId: 23
    //                 },
    //                 {
    //                     id: 26,
    //                     label: 'MENUITEMS.ICONS.LIST.DRIPICONS',
    //                     link: '/icons/dripicons',
    //                     parentId: 23
    //                 },
    //                 {
    //                     id: 27,
    //                     label: 'MENUITEMS.ICONS.LIST.FONTAWESOME',
    //                     link: '/icons/fontawesome',
    //                     parentId: 23
    //                 }
    //             ]
    //         },
    //         {
    //             id: 28,
    //             label: 'MENUITEMS.MAPS.TEXT',
    //             icon: 'bx bx-map',
    //             link: '/maps',

    //         },
    //     ]
    // },
    {
        id: 29,
        label: 'Usuários',
        icon: 'bx bxs-user',
        subItems: [
            {
                id: 30,
                label: 'Pesquisar Usuários',
                link: '/user/search-user',
                parentId: 29
           
            },
            {
                id: 38,
                label: 'Cadastro de Usuários',
                link: '/user/create-user',
                parentId: 29
                
            },
        ]
    },

];

