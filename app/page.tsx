"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MailIcon, MapPinIcon, MessageCircle, PhoneIcon } from "lucide-react"
import Link from "next/link"

export default function Contact02Page() {
  // función que maneja el envío del formulario
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault() // evita redirección

    const form = e.currentTarget
    const formData = new FormData(form)

    const res = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    if (data.ok) {
      alert("✅ Mensaje enviado con éxito")
      form.reset()
    } else {
      alert("❌ Error al enviar el mensaje: " + (data.error || "Desconocido"))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="w-full max-w-(--breakpoint-xl) mx-auto px-6 xl:px-0">
        <b className="text-muted-foreground uppercase font-semibold text-sm">
          Contact Us
        </b>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
          Chat with our friendly team!
        </h2>
        <p className="mt-3 text-base sm:text-lg text-muted-foreground">
          We&apos;d love to hear from you. Please fill out this form or shoot us
          an email.
        </p>

        <div className="mt-24 grid lg:grid-cols-2 gap-16 md:gap-10">
          {/* COLUMNA IZQUIERDA (igual visualmente) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
                <MailIcon />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Email</h3>
              <p className="my-2.5 text-muted-foreground">
                Our friendly team is here to help.
              </p>
              <Link
                className="font-medium text-primary"
                href="mailto:akashmoradiya3444@gmail.com"
              >
                akashmoradiya3444@gmail.com
              </Link>
            </div>
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
                <MessageCircle />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Live chat</h3>
              <p className="my-2.5 text-muted-foreground">
                Our friendly team is here to help.
              </p>
              <Link className="font-medium text-primary" href="#">
                Start new chat
              </Link>
            </div>
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
                <MapPinIcon />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Office</h3>
              <p className="my-2.5 text-muted-foreground">
                Come say hello at our office HQ.
              </p>
              <Link
                className="font-medium text-primary"
                href="https://map.google.com"
                target="_blank"
              >
                100 Smith Street Collingwood <br /> VIC 3066 AU
              </Link>
            </div>
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
                <PhoneIcon />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Phone</h3>
              <p className="my-2.5 text-muted-foreground">
                Mon-Fri from 8am to 5pm.
              </p>
              <Link
                className="font-medium text-primary"
                href="tel:+15550000000"
              >
                +1 (555) 000-0000
              </Link>
            </div>
          </div>

          {/* FORMULARIO DERECHA (idéntico visualmente) */}
          <Card className="bg-accent shadow-none py-0">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      className="mt-2 bg-white h-10 shadow-none"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      className="mt-2 bg-white h-10 shadow-none"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      className="mt-2 bg-white h-10 shadow-none"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Message"
                      className="mt-2 bg-white shadow-none"
                      rows={6}
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Checkbox id="acceptTerms" name="acceptTerms" className="bg-background" />
                    <Label htmlFor="acceptTerms" className="gap-0">
                      You agree to our
                      <Link href="#" className="underline ml-1">
                        terms and conditions
                      </Link>
                      <span>.</span>
                    </Label>
                  </div>
                </div>
                <Button className="mt-6 w-full" size="lg" type="submit">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
