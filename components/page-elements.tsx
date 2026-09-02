import Image from 'next/image';

export function PageHero({
  title,
  eyebrow,
  description,
  image = '/banner.png',
  imagePosition = 'center',
  images,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  image?: string;
  imagePosition?: string;
  images?: Array<{ src: string; position?: string }>;
}) {
  const heroImages = images?.length
    ? images
    : [{ src: image, position: imagePosition }];

  return (
    <section
      className={`page-hero${description ? ' page-hero-with-description' : ''}${heroImages.length > 1 ? ' page-hero-slideshow' : ''}`}
    >
      {heroImages.map((heroImage, index) => (
        <Image
          src={heroImage.src}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          className="page-hero-image page-hero-slide"
          style={{ objectPosition: heroImage.position ?? 'center' }}
          unoptimized={heroImage.src.startsWith('http')}
          key={heroImage.src}
        />
      ))}
      <div className="page-hero-shade" />
      <div className="container-wide page-hero-copy">
        {eyebrow ? <p className="page-hero-eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? (
          <p className="page-hero-description">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
