import React, { memo } from 'react';
import GoogleMap from 'google-map-react';
import { mapStyle } from '@/utils/mapStyle';
import MarkerComponent from '@/components/UI/GoogleMap/MarkerComponent';

const MapComponent = ({ center, zoom, items, radius, radiusCenter }) => {
	return (
		<GoogleMap
			bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_KEY }}
			defaultCenter={center}
			// center={center}
			defaultZoom={zoom}
			options={mapStyle}
			onGoogleApiLoaded={({ map }) => {
				if (radius > 0) {
					new google.maps.Circle({
						strokeColor: '#FF0000',
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: '#FF0000',
						fillOpacity: 0.3,
						map,
						center: radiusCenter,
						radius: radius * 1000,
						// radius: 120000,
					});
				}
			}}
		>
			{items &&
				items.length > 0 &&
				items.map((item) => (
					<MarkerComponent key={item.id} lat={item.lat} lng={item.lng} text={item.text} />
				))}
		</GoogleMap>
	);
};

export default memo(MapComponent);
