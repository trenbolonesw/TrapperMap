import { CircleLayerSpecification, FillLayerSpecification } from 'maplibre-gl';
import { StyleSpecification,GeoJSONSourceSpecification } from 'maplibre-gl';
import { StyleSheet } from 'react-native';

export const parkLayer: FillLayerSpecification = {
  id: 'landuse_park',
  type: 'fill',
  source: 'vector',
  'source-layer': 'landuse',
  filter: ['==', 'class', 'park'],
  paint: {
    'fill-color': '#4E3FC8'
  }
};


export const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap Contributors',
      maxzoom: 19
    },
    terrainSource: {
      type: 'raster-dem',
      url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
      tileSize: 256
    },
     hillshadeSource: {
                type: 'raster-dem',
                url: 'https://tiles.mapterhorn.com/tilejson.json'
            }
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm'
    },

    {
                id: 'hills',
                type: 'hillshade',
                source: 'hillshadeSource',
                layout: {visibility: 'visible'},
                paint: {'hillshade-shadow-color': '#473B24'}
            },

            
  ],
  terrain: {
    source: 'terrainSource',
    exaggeration: 1
  },
  sky: {
    
     "sky-color": "#199EF3",
    "sky-horizon-blend": 0.5,
    "horizon-color": "#ffffff",
    "horizon-fog-blend": 0.5,
    "fog-color": "#0000ff",
    "fog-ground-blend": 0.5,
    "atmosphere-blend": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        1,
        10,
        1,
        12,
        0
    ]
  },
  "zoom":10,
  
};

export const videoStyle:StyleSpecification = {
    'version': 8,
    
    'sources': {
        'satellite': {
            'type': 'raster',
            'url':'https://api.maptiler.com/tiles/satellite/tiles.json?key=LEsY4CuHdvfbZ7QFwQxa',
            'tileSize': 256,
             'minzoom': 0,
           'maxzoom': 18, 
            
            
        },
        'video': {
            'type': 'video',
            
            'urls': [
                'https://static-assets.mapbox.com/mapbox-gl-js/drone.mp4',
                'https://static-assets.mapbox.com/mapbox-gl-js/drone.webm'
            ],
            'coordinates': [
                [-122.51596391201019, 37.56238816766053],
                [-122.51467645168304, 37.56410183312965],
                [-122.51309394836426, 37.563391708549425],
                [-122.51423120498657, 37.56161849366671]
            ],
            
        }
    },
    'layers': [
        {
          
            'id': 'background',
            'type': 'background',
            'paint': {
                'background-color': 'rgb(4,7,14)'
                
            }
        },
        {
          
            'id': 'satellite',
            'type': 'raster',
            'source': 'satellite'
        },
        {
            'id': 'video',
            'type': 'raster',
            'source': 'video'
            
        }
    ]
};

export const mapStyles = StyleSheet.create({
    view:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    map:{
     width: 300, 
     height: 400,
     borderStyle:'solid',
      borderColor:'#362b2b',
        padding:2,
        borderRadius:1,
        backgroundColor:'#1d1d2b',
        top:20
    },
    marker:{
      color:'#1b597e'
    }
})

export const polygon:GeoJSONSourceSpecification = {
   'type':'geojson',
   'data':{
    'type':'FeatureCollection',
    'features':[
        {'type':'Feature',
            'properties':{},
            'geometry':{
                'type':'Polygon',
            
                'coordinates':[
                       [
                                [-121.353637, 40.584978],
                                [-121.284551, 40.584758],
                                [-121.275349, 40.541646],
                                [-121.246768, 40.541017],
                                [-121.251343, 40.423383],
                                [-121.32687, 40.423768],
                                [-121.360619, 40.43479],
                                [-121.363694, 40.409124],
                                [-121.439713, 40.409197],
                                [-121.439711, 40.423791],
                                [-121.572133, 40.423548],
                                [-121.577415, 40.550766],
                                [-121.539486, 40.558107],
                                [-121.520284, 40.572459],
                                [-121.487219, 40.550822],
                                [-121.446951, 40.56319],
                                [-121.370644, 40.563267],
                                [-121.353637, 40.584978]
                            ]
                ]
                
            }
        },
         {
            'properties':{},
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-121.415061, 40.506229]
                    }
                },
                {
                    'properties':{},
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-121.505184, 40.488084]
                    }
                },
                {
                    'properties':{},
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-121.354465, 40.488737]
                    }
                }
    ]
   }
}