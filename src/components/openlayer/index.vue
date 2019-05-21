<template>
    <div class="map-container">
        <div id="map" ref="rootmap"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import Map from 'ol/Map'
import View from 'ol/View'
import {get as getProjection,Projection} from 'ol/proj';
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
        this.createSource(newValue)
      },
  　　 deep: true
    }
  },
  created() {
    this.initMap();
  },
  methods:{
    initMap() {
      let controls = defaultControls(defaults.controls);
      let interactions = defaultInteractions(defaults.interactions);
      let view = createView(defaults.view);
      let map = new ol.Map({
          target: element[0],
          controls: controls,
          interactions: interactions,
          renderer: defaults.renderer,
          view: view,
          loadTilesWhileAnimating: defaults.loadTilesWhileAnimating,
          loadTilesWhileInteracting: defaults.loadTilesWhileInteracting
      });
      if (!attrs.customLayers) {
          let l = {
              type: 'Tile',
              source: {
                  type: 'OSM'
              }
          };
          let layer = createLayer(l, view.getProjection(), 'default');
          map.addLayer(layer);
          map.set('default', true);
      }
    },
    createView(view) {
      let projection = createProjection(view);

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
        let oSource = this.createSource(layer.source, projection);
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
        if (isDefinedAndNotNull(layer.opacity)) {
          layerConfig.opacity = layer.opacity;
        }
        if (isDefinedAndNotNull(layer.visible)) {
          layerConfig.visible = layer.visible;
        }
        if (isDefinedAndNotNull(layer.extent)) {
          layerConfig.extent = layer.extent;
        }
        if (isDefinedAndNotNull(layer.zIndex)) {
          layerConfig.zIndex = layer.zIndex;
        }
        if (isDefinedAndNotNull(layer.minResolution)) {
          layerConfig.minResolution = layer.minResolution;
        }
        if (isDefinedAndNotNull(layer.maxResolution)) {
          layerConfig.maxResolution = layer.maxResolution;
        }
        if (isDefinedAndNotNull(layer.style) && type === 'TileVector') {
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
    detectLayerType(layer) {
      if (layer.type) {
        return layer.type;
      } else {
        switch (layer.source.type) {
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
        }
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
