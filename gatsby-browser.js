export const onRouteUpdate = () => {
  setTimeout(() => window.scrollTo(0, 0), 0)
}

export const shouldUpdateScroll = () => {
  return false
}
