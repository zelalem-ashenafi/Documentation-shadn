"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { Search, Landmark, Banknote, CreditCard, BarChart3, BookOpen, LucideBadgeDollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { usePathname } from "next/navigation"
import DocPage from "../app/DocPage"
function LandingPage() {
  return(
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    <main className="flex-1 flex-col items-center justify-center  ">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center space-y-6">
        <Image src="/logo.png" alt="Logo" width={230} height={30} />
        <h1 className="text-2xl font-bold">Data Analytics Operation Documentation</h1>
        <p className="text-gray-600 max-w-xl">
          Access structured documentation for operations, credit, finance, and more.
        </p>

        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search documentation..."
            className="pl-10 h-12 text-lg"
          />
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 max-w-4xl w-full justify-items-center mt-4 items-stretch">
        {/* Branch Operation Card */}
        <Card className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl shadow-md cursor-pointer transition-all hover:shadow-lg hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="h-6 w-6 text-blue-700" />
              Branch Operation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-700">Manage conventional and Islamic (IFB) banking operations.</p>
            <div className="flex gap-3">
              <Button variant="default" className="flex-1">
                <Link href="/branch-operation/conv/tables" className="w-full h-full">Conv</Link>
                </Button>
              <Button variant="secondary" className="flex-1">
                <Link href="/branch-operation/ifb/tables" className="w-full h-full">IFB</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Credit */}
        <Link href="/credit/tables" className="h-full" >  
        <Card  className=" bg-gradient-to-r from-green-100 to-green-200 rounded-2xl shadow-md cursor-pointer transition-all hover:shadow-lg hover:scale-105 h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Banknote className="h-6 w-6 text-green-700" />
              Credit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">Loan services, credit management, and related processes.</p>
          </CardContent>
        </Card>
        </Link>
        {/* E-Banking */}
        <Link href="/e-banking/tables">
        <Card className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl shadow-md cursor-pointer transition-all hover:shadow-lg hover:scale-105 h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-orange-700" />
              E-Banking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">Online and mobile banking service documentation.</p>
          </CardContent>
        </Card>
        </Link>
        {/* Finance */}
        <Link href="/finance/tables" className="h-full ">
        <Card className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl shadow-md cursor-pointer transition-all hover:shadow-lg hover:scale-105 h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-purple-700" />
              Finance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">Financial reports, budgeting, and regulatory compliance.<br/><br/><br/><br/></p>
          </CardContent>
        </Card>
        </Link>
        {/* IBD */}
        <Link href="/IBD/tables" className="h-full ">
        <Card className="bg-gradient-to-r  from-orange-100 to-red-200 rounded-2xl shadow-md cursor-pointer transition-all hover:shadow-lg hover:scale-105 h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideBadgeDollarSign className="h-6 w-6 text-pink-700" />
              IBD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">Data related with International Banking, Buying and Selling, Currency Rate <br/><br/><br/><br/></p>
          </CardContent>
        </Card>
        </Link>
        
        
      </div>
      </div>
    </main>
    </motion.div>
  )

}

export default function HomePage() {
   
    const pathname = usePathname()
    return pathname === "/" ? <LandingPage /> : <DocPage />
  
}
