import Hero             from "@/components/Hero"
import VideoSection     from "@/components/VideoSection"
import Services         from "@/components/Services"
import Products         from "@/components/Products"
import Who              from "@/components/Who"
import Blog             from "@/components/Blog"
import BeforeYouGo      from "@/components/BeforeYouGo"
import Footer           from "@/components/Footer"
import PartnershipBadge from "@/components/ui/partnership-badge"

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <VideoSection />
        <Who />
        <Services />
        <Products />
        <Blog />
        <BeforeYouGo />
      </main>
      <Footer />
      <PartnershipBadge />
    </>
  )
}
