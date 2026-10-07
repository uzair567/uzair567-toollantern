import Script from 'next/script';
import { site } from '@/lib/site';

/** GA4 and/or GTM. Only rendered when the env vars are set (see SETUP.md). */
export function Analytics() {
  return (
    <>
      {site.gtmId && (
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmId}');`}</Script>
      )}
      {site.ga4Id && !site.gtmId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.ga4Id}');`}</Script>
        </>
      )}
      {site.adsenseClient && (
        <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsenseClient}`} crossOrigin="anonymous" strategy="lazyOnload" />
      )}
    </>
  );
}
