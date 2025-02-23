"use client";
import { Button } from "@repo/ui/button";
import { Pencil, Eraser, Undo, Share2 } from "lucide-react"
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">DrawApp</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/signin" className="text-gray-600 hover:text-gray-900">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-600 hover:text-gray-900">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Express Your Creativity</h2>
          <p className="text-xl text-gray-600 mb-8">
            DrawApp provides a simple and intuitive platform for digital drawing. Whether you're a professional artist
            or just doodling for fun, our tools are perfect for bringing your ideas to life.
          </p>
          <Button size="lg" className="mb-12">
            Start Drawing Now
          </Button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Pencil className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <h3 className="font-semibold">Multiple Brushes</h3>
            </div>
            <div className="text-center">
              <Eraser className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <h3 className="font-semibold">Easy Erasing</h3>
            </div>
            <div className="text-center">
              <Undo className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <h3 className="font-semibold">Undo/Redo</h3>
            </div>
            <div className="text-center">
              <Share2 className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <h3 className="font-semibold">Share Your Art</h3>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">&copy; 2025 DrawApp. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}