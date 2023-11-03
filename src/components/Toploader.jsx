import NextTopLoader from "nextjs-toploader";

export default function Toploader(){
    return (
        <NextTopLoader
          color="#ffcd33"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={false}
          showSpinner={false}
          easing="ease"
          speed={200}
          zIndex={1600}
        />
    )
}