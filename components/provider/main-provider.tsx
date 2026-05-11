import { ContactProvider } from "./contact-provider"
import { PartnerProvider } from "./partner-provider"
import { ThemeProvider } from "./theme-provider"

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <ContactProvider>
        <PartnerProvider>{children}</PartnerProvider>
      </ContactProvider>
    </ThemeProvider>
  )
}

export default MainProvider
