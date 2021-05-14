import FuncCode from '../../utils/permission'
const _import = require('../_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/',
    component: _import('project/index'),
    name: '',
    funccode: '',
    redirect: "PhysicalData/PhysicalInquiry",
    meta: { title: '首页' },
    children: [
      {
        path: "/PhysicalData",
        name: "PhysicalData",
        //redirect:"PhysicalInquiry",
        funccode: FuncCode.fad_experiment,
        meta: {
          name: "实物试验数据库"
        },
        component: () => import("../../views/index/index.vue"),
        children: [
          {
            path: "PhysicalInquiry",
            name: "PhysicalInquiry",
            funccode: FuncCode.fad_experiment_experiment,
            meta: {
              name: "试验数据查询",
              keepAlive: true
            },
            component: () => import("../../views/index/core/PhysicalData/PhysicalInquiry/index.vue")
          },
          {
            path: "PhysicalMaintenance",
            name: "PhysicalMaintenance",
            funccode: FuncCode.fad_experiment_maintain,
            meta: {
              name: "试验项目数据维护",
              keepAlive: true
            },
            component: () => import("../../views/index/core/PhysicalData/PhysicalMaintenance/index.vue")
          },
          {
            path: "InquiryDetails",
            name: "InquiryDetails",
            hidden: true,
            meta: {
              name: "水压查看详情"
            },
            component: () => import("../../views/index/core/PhysicalData/PhysicalInquiry/InquiryDetails/index.vue")
          },
          {
            path: "HighTemperatureDetails",
            name: "HighTemperatureDetails",
            hidden: true,
            meta: {
              name: "高温查看详情"
            },
            component: () => import("../../views/index/core/PhysicalData/PhysicalInquiry/HighTemperatureDetails/index.vue")
          },
          {
            path: "BendingDetails",
            name: "BendingDetails",
            hidden: true,
            meta: {
              name: "四点弯曲查看详情"
            },
            component: () => import("../../views/index/core/PhysicalData/PhysicalInquiry/BendingDetails/index.vue")
          },
          {
            path: "StaticJump",
            name: "StaticJump",
            hidden: true,
            meta: {
              name: "静态弯曲查看详情"
            },
            component: () => import("../../views/index/core/PhysicalData/PhysicalInquiry/StaticJump/index.vue")
          },
          {
            path: "NewWterPressure",
            name: "NewWterPressure",
            hidden: true,
            meta: {
              name: "新增水压爆破试验"
            },
            component: () => import("../../views/index/core/PhysicalData/PhysicalMaintenance/NewWterPressure/index.vue")
          },
          {
            path: "NewHighTemperature",
            name: "NewHighTemperature",
            hidden: true,
            meta: {
              name: "新增高温高压服饰模拟试验"
            },
            component: () => import("../../views/index/core/PhysicalData/PhysicalMaintenance/NewHighTemperature/index.vue")
          },
          {
            path: "FourNewPoints",
            name: "FourNewPoints",
            hidden: true,
            meta: {
              name: "新增四点弯曲试验"
            },
            component: () => import("../../views/index/core/PhysicalData/PhysicalMaintenance/FourNewPoints/index.vue")
          },
          {
            path: "NewStatic",
            name: "NewStatic",
            hidden: true,
            meta: {
              name: "新增静态弯曲"
            },
            component: () => import("../../views/index/core/PhysicalData/PhysicalMaintenance/NewStatic/index.vue")
          },
        ]
      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        path: "/simulation",
        name: "simulation",
        funccode: FuncCode.fad_simulation,
        meta: {
          name: "模拟分析数据"
        },
        component: () => import("../../views/index/index.vue"),
        children: [
          {
            path: "SimulatiQonuery",
            name: "SimulatiQonuery",
            funccode: FuncCode.fad_simulation_simulation,
            meta: {
              name: "模拟分析数据查询",
              keepAlive: true
            },
            component: () => import("../../views/index/core/simulation/SimulatiQonuery/index.vue")
          },
          {
            path: "SimulationMaintenance",
            name: "SimulationMaintenance",
            funccode: FuncCode.fad_simulation_maintain,
            meta: {
              name: "模拟分析数据维护",
              keepAlive: true
            },
            component: () => import("../../views/index/core/simulation/SimulationMaintenance/index.vue")
          },
          {
            path: "FluidAddendum",
            name: "FluidAddendum",
            hidden: true,
            meta: {
              name: "流体增加和编辑"
            },
            component: () => import("../../views/index/core/simulation/SimulationMaintenance/FluidAddendum/index.vue")
          },
          {
            path: "LimitedAddendum",
            name: "LimitedAddendum",
            hidden: true,
            meta: {
              name: "有限增加和编辑"
            },
            component: () => import("../../views/index/core/simulation/SimulationMaintenance/LimitedAddendum/index.vue")
          },
          {
            path: "NewFlow",
            name: "NewFlow",
            hidden: true,
            meta: {
              name: "流动增加和编辑"
            },
            component: () => import("../../views/index/core/simulation/SimulationMaintenance/NewFlow/index.vue")
          },
          {
            path: "NewExperience",
            name: "NewExperience",
            hidden: true,
            meta: {
              name: "经验增加和编辑"
            },
            component: () => import("../../views/index/core/simulation/SimulationMaintenance/NewExperience/index.vue")
          },
        ]
      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        path: "/BusinessConsultingManagement",
        name: "BusinessConsultingManagement",
        funccode: FuncCode.fad_consult,
        meta: {
          name: "业务咨询管理"
        },
        component: () => import("../../views/index/index.vue"),
        children: [
          {
            path: "MessageBoard",
            name: "MessageBoard",
            funccode: FuncCode.fad_consult_consult,
            meta: {
              name: "留言板"
            },
            component: () => import("../../views/index/core/BusinessConsultingManagement/MessageBoard/index.vue")
          },
          {
            path: "MailboxManagement",
            name: "MailboxManagement",
            funccode: FuncCode.fad_consult_maintain,
            meta: {
              name: "邮箱管理"
            },
            component: () => import("../../views/index/core/BusinessConsultingManagement/MailboxManagement/index.vue")
          },
        ]
      }


    ]
  }
]
