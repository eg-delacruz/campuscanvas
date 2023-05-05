import { useRouter } from "next/router"
import { useEffect, useRef } from "react"

//CLARIFICATIONS:
//1. This component is used to preserve the scroll position of the page in case a user goes to another route and comes back to the previous one, so that the user doesn't have to scroll down again.
export const usePreserveScroll = () => {
  const router = useRouter()

// This will get entries of visited URLs as keys and the corresponding scroll position as values
  const scrollPositions = useRef({})
  // This will be used to check if the user is navigating back.
  const isBack = useRef(false)
// We use useRef because this info has to be preserved across renders.

  useEffect(() => {
    // The beforePopState event is fired when a popstate event is about to be fired. In this case, we want to set isBack to true when the user is navigating back.
    router.beforePopState(() => {
      isBack.current = true
      return true
    })

    // We store the scroll position of the current URL in the scrollPositions object.
    const onRouteChangeStart = () => {
      const url = router.pathname
      scrollPositions.current[url] = window.scrollY
    }

    // We check if we are currentrly in a popstate (and if there is a scroll position for the target URL). If so, we scroll to the stored position.
    const onRouteChangeComplete = (url) => {
      if (isBack.current && scrollPositions.current[url]) {
        window.scroll({
          top: scrollPositions.current[url],
          behavior: "auto",
        })
      }

      isBack.current = false
    }

    // We add the event listeners to the router. This way, we can susbscribe our own functions to the router events.
    router.events.on("routeChangeStart", onRouteChangeStart)
    router.events.on("routeChangeComplete", onRouteChangeComplete)

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart)
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
  }, [router])
}