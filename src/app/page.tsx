import EarringCollection from "@/components/Earring-Collection";

export default async function Home() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative"
        style={{
          position: "relative",
          height: "600px",
          backgroundImage:
            "url('https://media-hosting.imagekit.io/88209bc0e6274ae8/2216ba6d-2e58-4aef-9f88-41c2820072d2.jpeg?Expires=1838582999&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=UXmneZxNv-A31oWV1yVBoGPGw68L3Z0kyLjCuQcI6iFZvg3hUEBMb1nhNpVu4cyRposZG3QY94hspO1v3wEDezB17vZKsDxfH1j6HkZdvMj8Uzyp3Io7rNrjfsaXurQHYc9Wt9vK6aFezAWplcM1RDwqMAwiSKTKzFMj8yF53xnHlyS0kBta~VA~zRb7MEH6qAOElDQ14RuTXrmZNlaUIB7tX3PUb0fI4AeQSB~cQgzP-Euhm1mUg~XDmUpObZy~ccV-xh2XGPBXRDWoTdO~FzojAupO6k3l~VQi5~WLycGTe6LB4TiHlqhQSXAw5nr8sT-yDizpBN7U5duv~uyytQ__')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Hero Content */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>EarMuse</h1>
          <p style={{ fontSize: "1.25rem", marginTop: "0.5rem" }}>
            Every piece of earring tells a story.
          </p>
        </div>
      </div>

      {/* Collections Section */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "-100px", // Pull the collections section up to overlap the hero section
        }}
      >
        <EarringCollection />
      </div>
    </>
  );
}