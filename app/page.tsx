import Hero         from "@/components/Hero"
import VideoSection from "@/components/VideoSection"
import Services     from "@/components/Services"
import Products     from "@/components/Products"
import Who          from "@/components/Who"
import Blog         from "@/components/Blog"
import BeforeYouGo  from "@/components/BeforeYouGo"
import Footer       from "@/components/Footer"

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <VideoSection />
        <Services />
        <Products />
        <Who />
        <Blog />
        <BeforeYouGo />
      </main>
      <Footer />
    </>
  )
}
