
import {
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
  partner7,
} from "@/assets/images";

const partners = [
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
  partner7,
];

export default function homeAgency() {
  return (
    <section className="agency_partner">
      <div className="container">
        <div className="text-center title_area">
          <h2>Agency Partners</h2>
        </div>

        {/* <Carousel opts={{ align: "start", loop: true }} className="agency_logo">
          <CarouselContent>
            {partners.map((logo, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/2 lg:basis-1/3 px-2"
              >
                <div className="flex justify-center items-center">
                  <img src={logo} alt={`Partner ${index + 1}`} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel> */}
      </div>
    </section>
  );
}
