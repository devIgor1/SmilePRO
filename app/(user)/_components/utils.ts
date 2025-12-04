/**
 * Handles smooth scrolling to anchor links with offset for sticky header
 */
export function handleNavClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string
) {
  if (href.startsWith("#")) {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }
}

