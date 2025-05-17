"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"

import { categories } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const closeSheet = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 sm:max-w-xs">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className={cn(
                    "text-lg font-medium transition-colors px-3 py-2 rounded-md hover:bg-accent",
                    pathname === "/" ? "bg-accent" : "transparent"
                  )}
                  onClick={closeSheet}
                >
                  Home
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className={cn(
                      "text-lg font-medium transition-colors px-3 py-2 rounded-md hover:bg-accent",
                      pathname === `/category/${category.id}` ? "bg-accent" : "transparent"
                    )}
                    onClick={closeSheet}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="font-bold text-xl md:text-2xl">
            DailyBytes
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === `/category/${category.id}`
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {category.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}