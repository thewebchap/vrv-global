import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-5 text-h1">This page could not be found.</h1>
      <p className="mt-4 max-w-md text-[17px] text-ink/60">
        The page you are looking for may have moved. Explore our products or get in touch with the team.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button href="/" variant="primary">Back to home</Button>
        <Button href="/products" variant="outline">Products &amp; services</Button>
      </div>
    </Container>
  );
}
