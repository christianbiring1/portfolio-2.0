"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm as useFormSpree, ValidationError } from "@formspree/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import SectionHeading from "@/components/section-heading";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  const t = useTranslations("Contact");
  // const [state, handleSubmit] = useFormSpree("manjnqrn");
  const [state, handleSubmit] = useFormSpree(
    process.env.NEXT_PUBLIC_FORM_SPREE_ID
  );

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const formSchema = z.object({
    name: z.string().min(2, {
      message: t("nameError"),
    }),
    email: z.string().email({
      message: t("emailError"),
    }),
    subject: z.string().min(5, {
      message: t("subjectError"),
    }),
    message: z.string().min(10, {
      message: t("messageError"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form spree >>>>>>>>>>", process.env.NEXT_PUBLIC_FORM_SPREE_ID);
    console.log("Validated form values:", values);

    try {
      // Create a FormData object for Formspree
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("subject", values.subject);
      formData.append("message", values.message);

      // Submit to Formspree
      await handleSubmit(formData);

      // Note: The success handling is done in the useEffect below
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      // setIsSubmitting(false);
    }
  }

  // Handle success state
  useEffect(() => {
    if (state.succeeded) {
      toast.success("The form has been submitted successfully!");
      form.reset();
    }
  }, [state.succeeded, form]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const socials = [
    {
      title: "github",
      icon: <FaGithub className="w-6 h-6" />,
      link: "https://github.com/christianbiring1",
    },
    {
      title: "LinkedIn",
      icon: <FaLinkedin className="w-6 h-6" />,
      link: "https://www.linkedin.com/in/christian-biringanine/",
    },
    {
      title: "X",
      icon: <FaXTwitter className="w-6 h-6" />,
      link: "https://twitter.com/Christianbirin4",
    },
    {
      title: "Instagram",
      icon: <FaInstagram className="w-6 h-6" />,
      link: "https://www.instagram.com/christian__bir/",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>{t("getInTouch")}</CardTitle>
                <CardDescription>{t("contactDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("email")}
                    </p>
                    <p className="font-medium text-[14px]">
                      christianbiringanine22@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("phone")}
                    </p>
                    <p className="font-medium">+250 784 165 912</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("location")}
                    </p>
                    <p className="font-medium">Kigali, Rwanda</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("socialTitle")}</CardTitle>
                <CardDescription>{t("socialDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {socials.map((social) => (
                    <a
                      key={social.title}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background hover:bg-primary hover:text-primary-foreground rounded-full p-3 transition-colors duration-300"
                    >
                      <span className="sr-only">{social.icon}</span>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("formTitle")}</CardTitle>
                <CardDescription>{t("formDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                {state.succeeded ? (
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-lg">
                    <p className="font-medium">{t("thankYou")}</p>
                    <p className="mt-2">{t("willRespond")}</p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={
                        // handleSubmit
                        form.handleSubmit(onSubmit)
                      }
                      className="space-y-6"
                      id="contact-form"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("nameLabel")}</FormLabel>
                              <FormControl>
                                <Input
                                  id="name"
                                  placeholder={t("namePlaceholder")}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div>
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("emailLabel")}</FormLabel>
                                <FormControl>
                                  <Input
                                    id="email"
                                    placeholder={t("emailPlaceholder")}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                          />
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("subjectLabel")}</FormLabel>
                            <FormControl>
                              <Input
                                id="subject"
                                placeholder={t("subjectPlaceholder")}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div>
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("messageLabel")}</FormLabel>
                              <FormControl>
                                <Textarea
                                  id="message"
                                  placeholder={t("messagePlaceholder")}
                                  className="min-h-32"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <ValidationError
                          prefix="Message"
                          field="message"
                          errors={state.errors}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={state.submitting}
                      >
                        {state.submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t("sending")}
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            {t("send")}
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
