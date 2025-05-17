import Link from "next/link"

import { categories } from "@/lib/data"

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-8 bg-background">
      <div className="container flex flex-col items-center gap-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">DailyBytes</h3>
            <p className="text-sm text-muted-foreground">
              Your daily source for news and entertainment
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Categories</h3>
            <div className="flex flex-col gap-1">
              {categories.slice(0, 4).map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">More Categories</h3>
            <div className="flex flex-col gap-1">
              {categories.slice(4).map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Legal</h3>
            <div className="flex flex-col gap-1">
              <Link
                href="/privacy-policy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DailyBytes. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Content is for demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}