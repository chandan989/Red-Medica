import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, MessageCircle, Mail, Play } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const quickStartGuides = [
    {
      title: 'Manufacturer Quick Start',
      description: 'Learn how to register products and manage your supply chain',
      duration: '5 min read',
    },
    {
      title: 'Distributor Guide',
      description: 'Accept shipments and transfer custody efficiently',
      duration: '4 min read',
    },
    {
      title: 'Pharmacy Setup',
      description: 'Set up your pharmacy and start verifying products',
      duration: '3 min read',
    },
    {
      title: 'Patient Verification',
      description: 'How to verify medicine authenticity using QR codes',
      duration: '2 min read',
    },
  ];

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I connect my wallet?',
          a: 'Click the "Connect Wallet" button in the top right corner, select your role (Manufacturer, Distributor, Pharmacy, or Patient), and your mock wallet will be connected. In production, this would connect to your actual Web3 wallet like MetaMask.',
        },
        {
          q: 'What blockchain is used?',
          a: 'This is a demonstration using simulated blockchain transactions. In production, Red Médica would run on Ethereum or a compatible EVM chain with support for NFT standards (ERC-721 for unique product tokens).',
        },
      ],
    },
    {
      category: 'Product Registration',
      questions: [
        {
          q: 'How do I register a new product?',
          a: 'Navigate to the Dashboard, click "Register New Product", and complete the 5-step form with product details, dates, composition, and regulatory information. The product will be registered on the blockchain with a unique ID and QR code.',
        },
        {
          q: 'Can I edit a product after registration?',
          a: 'No, blockchain records are immutable. However, you can add notes and transfer custody to update the supply chain history.',
        },
      ],
    },
    {
      category: 'Supply Chain',
      questions: [
        {
          q: 'How do I transfer custody?',
          a: 'Go to the product details page and click "Transfer Custody". Enter the recipient\'s wallet address, shipping details, and storage conditions. Confirm the transfer to record it on the blockchain.',
        },
        {
          q: 'What happens if temperature deviates during transit?',
          a: 'Temperature sensors connected via IoT integrations will automatically log deviations on the blockchain. You\'ll receive real-time alerts, and the product\'s compliance score will be updated.',
        },
      ],
    },
    {
      category: 'Verification',
      questions: [
        {
          q: 'How does QR verification work?',
          a: 'Each product has a unique QR code linked to its blockchain record. Scanning it instantly shows the complete supply chain history, manufacturing details, and authenticity verification.',
        },
        {
          q: 'What if a product cannot be verified?',
          a: 'If a product ID is not found in the blockchain, it may be counterfeit. The system will display a warning and provide options to report the suspicious product to authorities.',
        },
      ],
    },
  ];

  return (
    <>
      <style>{`
        body {
            font-family: 'Inter', sans-serif;
            background: #F7FAFC;
            color: #ffffff;
        }
        .card {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            transition: all 0.3s ease;
            border-radius: 0.75rem;
        }
        .card:hover {
            border-color: #3B82F6;
            transform: translateY(-5px);
            box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1);
        }
        .cta-gradient {
            background: linear-gradient(90deg, #3B82F6, #2563EB);
            color: white;
            transition: opacity 0.3s ease;
        }
        .cta-gradient:hover {
            opacity: 0.9;
        }
        ::selection {
            background-color: #3B82F6;
            color: white;
        }
        .table-row-hover:hover {
          background-color: #F7FAFC;
        }
      `}</style>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />

        <main className="container mx-auto max-w-7xl px-4 pt-28 pb-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex rounded-full bg-blue-100 p-4">
              <BookOpen className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-gray-900 md:text-6xl">
              Help & Documentation
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Everything you need to know about Red Médica
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search documentation..."
                    className="pl-12 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content: FAQ */}
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((category, categoryIndex) => (
                  <Card key={categoryIndex}>
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-800">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((item, itemIndex) => (
                          <AccordionItem key={itemIndex} value={`item-${categoryIndex}-${itemIndex}`}>
                            <AccordionTrigger className="text-left font-medium text-gray-700 hover:text-blue-600">
                              {item.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600">
                              {item.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar: Quick Start & Contact */}
            <div className="space-y-8">
              {/* Quick Start Guides */}
              <div>
                <h2 className="mb-6 text-3xl font-bold text-gray-900">Quick Start</h2>
                <div className="space-y-4">
                  {quickStartGuides.map((guide, index) => (
                    <Card key={index} className="group cursor-pointer">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-full bg-blue-100 p-3 text-blue-600 transition-transform group-hover:scale-110">
                          <Play className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{guide.title}</p>
                          <p className="text-sm text-gray-600">{guide.duration}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Contact Support</CardTitle>
                  <CardDescription>Can't find an answer? Let us know.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Input placeholder="Your Name" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Email Address" />
                  </div>
                  <div>
                    <Textarea placeholder="Describe your issue..." rows={4} />
                  </div>
                  <Button className="w-full cta-gradient">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
              
              {/* Other ways to get help */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">support@redmedica.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MessageCircle className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Join our Discord</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Help;
