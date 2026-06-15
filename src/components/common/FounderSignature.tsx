export interface FounderSignatureProps {
  heading: string;
  body: string;
  closingSalutation: string;
  signatureName: string;
  signatureTitle: string;
}

export function FounderSignature({
  heading,
  body,
  closingSalutation,
  signatureName,
  signatureTitle,
}: FounderSignatureProps) {
  return (
    <section className="section-padding bg-surface-alternate">
      <div className="container-content">
        <div className="reading-column">
          <h2 className="text-section-h2 font-display text-text-primary mb-8">
            {heading}
          </h2>
          <p className="text-body-large text-text-secondary leading-relaxed mb-8">
            {body}
          </p>
          <div className="mt-12">
            <p className="text-body-base text-text-secondary italic mb-2">
              {closingSalutation}
            </p>
            <p className="text-body-large font-bold text-text-primary">
              {signatureName}
            </p>
            <p className="text-body-base text-text-secondary mt-1">
              {signatureTitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
