import {FunctionComponent} from 'react';
import {Map} from '@vis.gl/react-google-maps'; // <MapControl/>
import {Markers} from '@/components/markers';
import {MarkerData} from '@/types/location-types';
import {Park} from '@/types/park-types';

interface MyMapProps {
    longitude: number;
    latitude: number;
    parkMarkers?: MarkerData[];
}

export const MyMap: FunctionComponent<MyMapProps> = ({longitude, latitude, parkMarkers}) => {
    const userLocation: MarkerData = {
        park: {
            id: 'your-location-id',
            fullName: 'Your Position'
        } as Park,
        location: {
            lat: latitude,
            lng: longitude
        }
    };

    // TODO: Implement <MapControl/> to refine visible markers
    //<MapControl position={ControlPosition.TOP_LEFT}></MapControl>
    // TODO: Add <Switch/> map controls that toggle <Markers/> with other data from API
    return (
        <div className=''>
            <Map
                colorScheme={'FOLLOW_SYSTEM'}
                defaultCenter={{
                    lat: 38.68305259919395,
                    lng: -94.8430405088294
                }}
                defaultTilt={30}
                defaultZoom={4.35}
                disableDefaultUI={true}
                gestureHandling={'greedy'}
                mapId={'17b67c316f835bbf'}
                style={{position: 'sticky', right: '0', top: '0', width: '70vw', height: '100vh'}}
                reuseMaps={true}
                renderingType={'VECTOR'}
            >
                <Markers markers={parkMarkers && parkMarkers.length > 0 ? [...parkMarkers] : []} />
            </Map>
        </div>
    );
};
