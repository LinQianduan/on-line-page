<script lang="tsx">
import { ref, reactive, defineComponent, onMounted, onUnmounted } from "vue";
import './index.scss'
import ksh from '@/assets/image/ksh33.png' 
import windowResize from '../../utils/resize';
import { useRouter } from 'vue-router'
import ChinaMapChart from './components/chinaMapChart.vue'
import TripModeChart from './components/tripModeChart.vue'
import barAccidentChart from './components/barAccidentChart.vue'
import lineBrushChart from './components/lineBrushChart.vue'
import barTripSortChart from './components/barTripSortChart.vue'
import scrollTableData from './components/scrollTableData.vue'
import CenterBottom from './components/centerBottom.vue'
import RightTopChart from './components/rightTopChart.vue'
import LeftTopChart from './components/leftTopChart.vue'
import map from '@/assets/img/map.png'
import lbx from '@/assets/img/lbx.png'
import jt from '@/assets/img/jt.png'
const { screenRef, calcRate, windowDraw, unWindowDraw } = windowResize()
export default defineComponent({
  components: {
    ChinaMapChart,
    TripModeChart,
    barAccidentChart,
    lineBrushChart,
    barTripSortChart,
    scrollTableData,
    CenterBottom,
    RightTopChart,
    LeftTopChart
  },
  expose: ['initCharts'],
  methods: {},
  setup(props, ctx) {
    const router = useRouter()
    const chinaMapChartRef = ref<InstanceType<typeof ChinaMapChart> | null>(null);
    const tripModeChartRef = ref<InstanceType<typeof TripModeChart> | null>(null);
    const barAccidentChartRef = ref<InstanceType<typeof barAccidentChart> | null>(null);
    const lineBrushChartRef = ref<InstanceType<typeof barAccidentChart> | null>(null);
    const barTripSortChartRef = ref<InstanceType<typeof barTripSortChart> | null>(null);
    const rightTopChartRef = ref<InstanceType<typeof RightTopChart> | null>(null);
    const LeftTopChartRef = ref<InstanceType<typeof LeftTopChart> | null>(null);
    const scrollTableDataRef = ref<InstanceType<typeof scrollTableData> | null>(null);
    onMounted(() => {
      windowDraw()
      calcRate()
      initCharts()
    })
    onUnmounted(() => {
      unWindowDraw()
    })
    window.onresize = () => {
      initCharts()
    };
    const initCharts = () => {
      (chinaMapChartRef.value as any)?.initChart().resize();
      tripModeChartRef.value?.initChart().resize();
      barAccidentChartRef.value?.initChart().resize();
      lineBrushChartRef.value?.initChart();
      rightTopChartRef.value?.initChart().resize();
      LeftTopChartRef.value?.initChart().resize();
    };
    const back = () => {
      router.go(-1)
    };
    const goHome = () => {
      router.push('/')
    };

    const render = () => {
      return (
        <>
          <div class='large-box'>
            <div class="screen-content" ref={screenRef}>
              <div class="dataScreen-header">
                <div class="header-lf">
                  <span class="header-screening" onClick={back}>返 回</span>
                </div>
                <div class="header-ct">
                  <div class="header-ct-title">
                    <span>智慧出行可视化大数据展示平台</span>
                    <dv-decoration-6 class="header-ct-warning" color={['#56e3c2', '#69a2e3']} style="width:260px; height:30px;" />
                  </div>
                </div>
                <div class="header-rg">
                  <span class="header-screening" onClick={goHome}>首 页</span>
                </div>
              </div>
              <div class="div5 visual_bd">
                <LeftTopChart ref={ LeftTopChartRef }></LeftTopChart>
              </div>
              <div class="div6 visual_bd">
                <TripModeChart ref={tripModeChartRef}></TripModeChart>
              </div>
              <div class="div7">
                <div class='visual_title'>
                  <span>事故统计</span>
                  <img src={ksh}></img>
                </div>
                <div class='chart_box'>
                  <barAccidentChart ref={barAccidentChartRef}></barAccidentChart>
                </div>
              </div>
              <div class="div8 visual_bd_center">
                <div class="map">
                  <div class="map1">
                    <img src={lbx} />
                  </div>
                  <div class="map2">
                    <img src={jt} />
                  </div>
                  <div class="map3">
                    <img src={map} />
                  </div>
                </div>
                <dv-border-box-8 dur={10}>
                  <ChinaMapChart ref={chinaMapChartRef}></ChinaMapChart>
                </dv-border-box-8>
              </div>
              <div class="div9 visual_bd">
                <div class="box10">
                  <center-bottom></center-bottom>
                </div>
              </div>
              <div class="div10 visual_bd">
                <right-top-chart ref={rightTopChartRef}></right-top-chart>
              </div>
              <div class="div11 visual_bd">
                <barTripSortChart ref={barTripSortChartRef}></barTripSortChart>
              </div>
              <div class="div12">
                <div class='visual_title'>
                  <span>交通流量</span>
                  <img src={ksh}></img>
                </div>
                <div class='chart_box'>
                  <lineBrushChart ref={lineBrushChartRef}></lineBrushChart>
                </div>
              </div>
              <div class='footer-section'>
                <div class='screen-footer'>
                  <div class="screen-footer-left">
                    <dv-decoration-10 color={['#0788b3', '#000000']} class="dv-dec-10" />
                  </div>
                  <div class='screen-footer-middle'>
                    <dv-decoration-5 style={'margin-top: 8px;'} color={['#0788b3', '#000000']} dur={12} />
                  </div>
                  <div class='screen-footer-right'>
                    <dv-decoration-10 color={['#0788b3', '#000000']} class="dv-dec-10 dev-reverse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    };
    return render
  },
});
</script>
