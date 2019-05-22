<template>
    <div class="map-container">
        <div id="map" ref="rootmap"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import Map from 'ol/Map'
import View from 'ol/View'
import {get as getProjection,Projection,transform} from 'ol/proj';
import {defaults as defaultControls} from 'ol/control';
import {defaults as defaultInteractions, DragAndDrop} from 'ol/interaction.js';
import source from "ol/source";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import format from "ol/format";
import ImageWMS from 'ol/source/ImageWMS'
import TileWMS from 'ol/source/TileWMS'
import BingMaps from 'ol/source/BingMaps'
import Heatmap from 'ol/layer/Heatmap'
import Tile from 'ol/layer/Tile'
import Image from 'ol/layer/Image'
import Vector from 'ol/layer/Vector'
import VectorTile from 'ol/layer/VectorTile'
import Cluster from 'ol/source/Cluster'
import Icon from 'ol/style/Icon'
// import ServerVector from 'ol/source/ServerVector'
// import MapQuest from 'ol/source/MapQuest'
import TileImage from 'ol/source/TileImage'
import TileArcGISRest from "ol/source/TileArcGISRest";
import Attribution from 'ol/control/Attribution'
import {URL_CFG} from '@/config/index'
/*
ol.source.onlineMap = function (options) {
    let options = options ? options : {};

    let attributions;//右下角标识
    if (options.attributions !== undefined) {
        attributions = option.attributions;
    } else if (options.mapType.indexOf("aMap") != -1) {
        attributions = new ol.Attribution({
            html: '&copy; <a class="ol-attribution-amap" ' + 'href="http://ditu.amap.com/">' + '高德地图</a>'
        });
    } else if (options.mapType.indexOf("tian") != -1) {
        attributions = new ol.Attribution({
            html: '&copy; <a class="ol-attribution-tianmap" ' + 'href="http://www.tianditu.cn/">' + '天地图</a>'
        });
    } else if (options.mapType.indexOf("geoq") != -1) {
        attributions = new ol.Attribution({
            html: '&copy; <a class="ol-attribution-geoqmap" ' + 'href="http://www.geoq.net/basemap.html">' + '智图地图</a>'
        });
    } else if (options.mapType.indexOf("google") != -1) {
        attributions = new ol.Attribution({
            html: '&copy; <a class="ol-attribution-googlemap" ' + 'href="http://www.google.cn/maps">' + '谷歌地图</a>'
        });
    }
    let url = mapUrl[options.mapType];
    ol.source.XYZ.call(this, {
        crossOrigin: 'anonymous',   //跨域
        cacheSize: options.cacheSize,
        projection: ol.proj.get('EPSG:3857'),
        url: url,
        attributions: attributions,
        wrapX: options.wrapX !== undefined ? options.wrapX : true
    });
};
ol.inherits(ol.source.onlineMap, ol.source.XYZ);//必需
*/
let attributions = new Attribution({
    html: '&copy; <a class="ol-attribution-amap" ' + 'href="http://www.dx-tech.com">' + 'HGT</a>'
});
export default {
  components: {

  },
  props:['viewConfig'],
  data() {
    return {
      map: null,
      viewConfig:this.viewConfig,
    };
  },
  mounted() {
    let mapcontainer = this.$refs.rootmap;
    this.map = new Map({
      layers: [
        new TileLayer({
          title: "动态数据",
          source: new TileArcGISRest({
            attributions: '© <a href="http://www.dx-tech.com/">HGT</a>',
            // tileLoadFunction: source.tileLoadFunction,
            url: 'http://192.168.250.44:6080/arcgis/rest/services/SHCXGL/cityMgrdt/MapServer',
            wrapX:true
          })
        }),
      ],
        target: 'map',
        view: new View({
            projection: "EPSG:4326",    //使用这个坐标系
            center: [111.8,32.4],  //武汉
            zoom: 12
        })
    });
  },
  watch:{
    viewConfig: {
      handler(newValue, oldValue) {
        this.initMap(newValue)
      },
  　　 deep: true
    }
  },
  created() {
    this.initMap();
  },
  methods:{
    initMap(source) {
      let base64icon = 'data:image/png;base64,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';
      let defaults ={
        view: {
            projection: 'EPSG:3857',
            minZoom: undefined,
            maxZoom: undefined,
            rotation: 0,
            extent: undefined
        },
        center: {
            lat: 0,
            lon: 0,
            zoom: 1,
            autodiscover: false,
            bounds: [],
            centerUrlHash: false,
            projection: 'EPSG:4326'
        },
        styles: {
            path: {
                stroke: {
                    color: 'blue',
                    width: 8
                }
            },
            marker: {
                image: new Icon({
                    anchor: [0.5, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    opacity: 0.90,
                    src: base64icon
                })
            }
        },
        events: {
            map: [],
            markers: [],
            layers: []
        },
        controls: {
            attribution: true,
            rotate: false,
            zoom: true
        },
        interactions: {
            mouseWheelZoom: false
        },
        renderer: 'canvas'
      };
      debugger
      let controls = defaultControls(defaults.controls);
      let interactions = defaultInteractions(defaults.interactions);
      let view = this.createView(defaults.view);
      let map = new Map({
          target: 'map',
          controls: controls,
          interactions: interactions,
          renderer: defaults.renderer,
          view: view,
          loadTilesWhileAnimating: defaults.loadTilesWhileAnimating,
          loadTilesWhileInteracting: defaults.loadTilesWhileInteracting
      });
      if (source) {
          let layer = this.createLayer(source, view.getProjection(), 'default');
          map.addLayer(layer);
          map.set('default', true);
      }
      // let c = transform([defaults.center.lon,
      //         defaults.center.lat
      //     ],
      //     defaults.center.projection, view.getProjection()
      // );
      // view.setCenter(c);
      // view.setZoom(defaults.center.zoom);
    },
    createView(view) {
      let projection = this.createProjection(view);

      let viewConfig = {
        projection: projection,
        maxZoom: view.maxZoom,
        minZoom: view.minZoom
      };

      if (view.center) {
        viewConfig.center = view.center;
      }
      if (view.extent) {
        viewConfig.extent = view.extent;
      }
      if (view.zoom) {
        viewConfig.zoom = view.zoom;
      }
      if (view.resolutions) {
        viewConfig.resolutions = view.resolutions;
      }

      return new View(viewConfig);
    },
    createProjection(view) {
      let oProjection;

      switch (view.projection) {
        case 'pixel':
          if (!view.extent) {
            return;
          }
          oProjection = Projection({
            code: 'pixel',
            units: 'pixels',
            extent: view.extent
          });
          break;
        default:
          oProjection = getProjection(view.projection);
          break;
      }
      return oProjection;
    },
    createSource(sources, projection) {
      debugger
      let oSource;
      let pixelRatio;
      let url;
      let source = sources[sources.type].source;

      switch (source.type) {
        case 'ImageWMS':
          if (!source.url || !source.params) {
            return;
          }
          oSource = new ImageWMS({
            url: source.url,
            imageLoadFunction: source.imageLoadFunction,
            attributions: this.createAttribution(source),
            crossOrigin: (typeof source.crossOrigin === 'undefined') ? 'anonymous' : source.crossOrigin,
            params: this.deepCopy(source.params),
            ratio: source.ratio
          });
          break;

        case 'OSM':
          oSource = new OSM({
            tileLoadFunction: source.tileLoadFunction,
            attributions: this.createAttribution(source),
            wrapX: source.wrapX !== undefined ? source.wrapX : true
          });

          if (source.url) {
            oSource.setUrl(source.url);
          }

          break;
        case 'TileArcGISRest':
          if (!source.url) {
            return;
          }
          oSource = new TileArcGISRest({
            attributions: this.createAttribution(source),
            tileLoadFunction: source.tileLoadFunction,
            url: source.url,
            wrapX: source.wrapX !== undefined ? source.wrapX : true
          });

          break;
        case 'XYZ':
          if (!source.url && !source.tileUrlFunction) {
            return;
          }
          oSource = new XYZ({
            url: source.url,
            attributions: this.createAttribution(source),
            minZoom: source.minZoom,
            maxZoom: source.maxZoom,
            projection: source.projection,
            tileUrlFunction: source.tileUrlFunction,
            tileLoadFunction: source.tileLoadFunction,
            wrapX: source.wrapX !== undefined ? source.wrapX : true
          });
          break;
      }

      if (!oSource) {
        return;
      }
      this.map = new Map({
          layers: [
            oSource
          ],
          target: 'map',
          view: new View({
            projection: "EPSG:4326",    //使用这个坐标系
            center: [111.8,32.4],  //深圳
            zoom: 12
          })
      });
      return oSource;
    },
    deepCopy(oldObj) {
        let newObj = oldObj;
        if (oldObj && typeof oldObj === 'object') {
            newObj = Object.prototype.toString.call(oldObj) === '[object Array]' ? [] : {};
            for (let i in oldObj) {
              newObj[i] = this.deepCopy(oldObj[i]);
            }
        }
        return newObj;
    },

    createAttribution(source) {
        let attributions = [];
        if (source.attribution) {
            // opt-out -> default tries to show an attribution
            if (!(source.attribution === false)) { // jshint ignore:line
              // we got some HTML so display that as the attribution
              attributions.unshift(new Attribution({html: source.attribution}));
            }
        } else {
            // try to infer automatically
            let attrib = this.extractAttributionFromSource(source);
            if (attrib) {
              attributions.unshift(attrib);
            }
        }

      return attributions;
    },
    extractAttributionFromSource(source) {
        if (source && source.type) {
            let ol3SourceInstance = source[source.type];
            if (ol3SourceInstance) {
              // iterate over the object's props and try
              // to find the attribution one as it differs
              for (let prop in ol3SourceInstance) {
                if (ol3SourceInstance.hasOwnProperty(prop)) {
                  if (prop.toLowerCase().indexOf('attribution') > -1) {
                    return source[source.type][prop];
                  }
                }
              }
            }
        }

        return null;
    },
    createLayer(layer, projection, name, onLayerCreatedFn) {

        let oLayer;
        let type = this.detectLayerType(layer);
        let oSource = this.createSource(layer, projection);
        if (!oSource) {
            return;
        }

        // handle function overloading. 'name' argument may be
        // our onLayerCreateFn since name is optional
        if (typeof(name) === 'function' && !onLayerCreatedFn) {
          onLayerCreatedFn = name;
          name = undefined; // reset, otherwise it'll be used later on
        }

        // Manage clustering
        if ((type === 'Vector') && layer.clustering) {
          oSource = new Cluster({
            source: oSource,
            distance: layer.clusteringDistance
          });
        }

        let layerConfig = {};

        // copy over eventual properties set on the passed layerconfig which
        // can later be retrieved via layer.get('propName');
        for (let property in layer) {
          if (layer.hasOwnProperty(property) &&
            // ignore props like source or those angular might add (starting with $)
            // don't use startsWith as it is not supported in IE
            property.indexOf('$', 0) !== 0 &&
            property.indexOf('source', 0) !== 0 &&
            property.indexOf('style', 0) !== 0
            ) {
            layerConfig[property] = layer[property];
          }
        }

        layerConfig.source = oSource;

        // ol.layer.Layer configuration options
        if (this.isDefinedAndNotNull(layer.opacity)) {
          layerConfig.opacity = layer.opacity;
        }
        if (this.isDefinedAndNotNull(layer.visible)) {
          layerConfig.visible = layer.visible;
        }
        if (this.isDefinedAndNotNull(layer.extent)) {
          layerConfig.extent = layer.extent;
        }
        if (this.isDefinedAndNotNull(layer.zIndex)) {
          layerConfig.zIndex = layer.zIndex;
        }
        if (this.isDefinedAndNotNull(layer.minResolution)) {
          layerConfig.minResolution = layer.minResolution;
        }
        if (this.isDefinedAndNotNull(layer.maxResolution)) {
          layerConfig.maxResolution = layer.maxResolution;
        }
        if (this.isDefinedAndNotNull(layer.style) && type === 'TileVector') {
          layerConfig.style = layer.style;
        }

        switch (type) {
          case 'Image':
            oLayer = new Image(layerConfig);
            break;
          case 'Tile':
            oLayer = new Tile(layerConfig);
            break;
          case 'Heatmap':
            oLayer = new Heatmap(layerConfig);
            break;
          case 'Vector':
            oLayer = new Vector(layerConfig);
            break;
          case 'TileVector':
            oLayer = new VectorTile(layerConfig);
            break;
        }
        if (!oLayer) {
          return;
        }
        // set a layer name if given
        if (!name) {
          oLayer.set('name', name);
        } else if (!layer.name) {
          oLayer.set('name', layer.name);
        }

        // set custom layer properties if given
        if (layer.customAttributes) {
          for (let key in layer.customAttributes) {
            oLayer.set(key, layer.customAttributes[key]);
          }
        }

        // invoke the onSourceCreated callback
        if (onLayerCreatedFn) {
          onLayerCreatedFn({
            oLayer: oLayer
          });
        }

      return oLayer;
    },
    isDefinedAndNotNull(value) {
      return value && value !== null;
    },
    detectLayerType(layer) {
      // if (layer[layer.type].source.type) {
      //   return layer[layer.type].source.type;
      // } else {
        switch (layer[layer.type].source.type) {
          case 'ImageWMS':
            return 'Image';
          case 'ImageStatic':
            return 'Image';
          case 'GeoJSON':
          case 'JSONP':
          case 'TopoJSON':
          case 'KML':
          case 'WKT':
            return 'Vector';
          case 'TileVector':
          case 'MVT':
            return 'TileVector';
          default:
            return 'Tile';
        // }
      }
    }
  }
};
</script>

<style>
.map-container, #map {
  width: 100%;
  height: 100%;
}
/*隐藏ol的一些自带元素*/
.ol-attribution,.ol-zoom {
  display: none;
}
</style>
