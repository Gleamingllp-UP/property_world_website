import PropertiesOnMap from "./PropertiesOnMap";

export default function PropertyMapView() {
 

  return (
    <div>
      <PropertiesOnMap
        properties={[
          {
            title: "Luxury Villa",
            location: { lat: 25.1123, lng: 55.1381 },
            price: "$2M",
            address: "Palm Jumeirah",
          },
          {
            title: "Luxury Villa23",
            location: { lat: 25.1123, lng: 55.1381 },
            price: "$2M",
            address: "Palm Jumeirah",
          },
          {
            title: "Apartment Downtown",
            location: { lat: 25.2048, lng: 55.2708 },
            price: "$750K",
            address: "Downtown Dubai",
          },
          {
            title: "Skyline Studio",
            location: { lat: 25.1843, lng: 55.2657 },
            price: "$350K",
            address: "Business Bay",
          },
          // ...filtered property list
        ]}
        defaultCenter={{ lat: 25.2048, lng: 55.2708 }}
        zoom={10}
      />
    </div>
  );
}
