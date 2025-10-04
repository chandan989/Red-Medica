import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Search,
  BookOpen,
  MessageCircle,
  Mail,
  ChevronDown,
  ChevronRight,
  Play,
} from 'lucide-react';
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
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex rounded-full bg-primary/10 p-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-4xl font-bold">Help & Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Red Médica
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8 shadow-soft">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Guides */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Quick Start Guides</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {quickStartGuides.map((guide, index) => (
              <Card key={index} className="group cursor-pointer shadow-soft transition-all hover:shadow-medium">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-2 text-primary transition-transform group-hover:scale-110">
                      <Play className="h-4 w-4" />
                    </div>
                    <span className="text-xs text-muted-foreground">{guide.duration}</span>
                  </div>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {category.questions.map((item, itemIndex) => (
                      <AccordionItem key={itemIndex} value={`item-${categoryIndex}-${itemIndex}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
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

        {/* Contact Support */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Send us a message and we'll get back to you</CardDescription>
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
              <Button className="w-full gradient-primary">
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Other Ways to Get Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Email Support</div>
                  <div className="text-sm text-muted-foreground">support@redmedica.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div className="rounded-full bg-secondary/10 p-3 text-secondary">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Discord Community</div>
                  <div className="text-sm text-muted-foreground">Join our community chat</div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div className="rounded-full bg-success/10 p-3 text-success">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Documentation</div>
                  <div className="text-sm text-muted-foreground">Read full API docs</div>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <div className="mb-2 font-semibold">Helpline</div>
                <div className="text-2xl font-bold text-primary">1-800-MEDICA-VERIFY</div>
                <div className="text-sm text-muted-foreground">Available 24/7</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
