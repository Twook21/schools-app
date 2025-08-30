import HomePage from "@/app/(public)/homepage/page";
import AboutSection from "@/app/(public)/about-us/page";
import ActivitiesPage from "@/app/(public)/activities/page";
import NewsPage from "@/app/(public)/news/page";
import ContactSection from "@/app/(public)/contact/page";
import MajorsPage from "@/app/(public)/majors/page";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton"; 

const AppRootPage = () => {
  return (
    <>
      <HomePage />
      <AboutSection />
      <MajorsPage />
      <ActivitiesPage />
      <NewsPage />
      <ContactSection />
      <Footer />
      <BackToTopButton /> 
    </>
  );
};

export default AppRootPage;