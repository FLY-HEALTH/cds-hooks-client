import React from 'react';

interface CardProps {
  card: any;
  fhirServer: string;
  launchToken: string;
}

export const CdsCard = ({ card, fhirServer, launchToken }: CardProps) => {
  const handleLaunch = (link: any) => {
    const smartUrl = `${link.url}?iss=${encodeURIComponent(fhirServer)}&launch=${launchToken}`;
    window.open(smartUrl, '_blank');
  };

  return (
    <div className={`card ${card.indicator}`} style={{ border: '1px solid gray', marginBottom: 10, padding: 10 }}>
      <h3>{card.summary}</h3>
      <p>{card.detail}</p>
      {card.links?.map((link: any, idx: number) => (
        link.type === 'smart' ? (
          <button key={idx} onClick={() => handleLaunch(link)}>
            Launch SMART App: {link.label}
          </button>
        ) : (
          <a key={idx} href={link.url} target="_blank" rel="noreferrer" key={idx}>
            {link.label}
          </a>
        )
      ))}
    </div>
  );
};
