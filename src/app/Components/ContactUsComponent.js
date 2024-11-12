"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {useEffect, useState} from "react";
import baseURL from "@/app/Components/BaseURL";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import {useToast} from "@/hooks/use-toast";

export default function ContactUsComponent() {

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {toast} = useToast()


  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`${baseURL}contact-us/`, {
          method: "GET",
          headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setContacts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchContact()
  }, [])

  const handleStatusToggle = async (contactId) => {

    try {
      const response = await fetch(`${baseURL}contact-us-get/${contactId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({read: true}),
      });
      if (!response.ok) {
        toast({description:"Something went wrong", variant: 'destructive'})
      } else {
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === contactId ? {...contact, read: true} : contact
          )
        );
        toast({description:"Updated successfully."});
      }

    } catch (error) {
      console.error("Failed to update status:", error);
      // Revert state if the API call fails
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === contactId ? {...contact, read: false} : contact
        )
      );
    }
  }

  return (
    <div className="flex flex-col justify-center">
      <h1 className="mt-10">Contact Us</h1>
      <div className="mt-10 w-1/2 flex justify-center items-center">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Inquiry</TableHead>
              <TableHead>Newsletter</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Read</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact, index) => (
              <TableRow key={index}>
                <TableCell>{contact.first_name}</TableCell>
                <TableCell>{contact.last_name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.inquiry}</TableCell>
                <TableCell>{contact.signup_to_newsletter ? "Yes" : "No"}</TableCell>
                <TableCell>{contact.note || "N/A"}</TableCell>
                <TableCell>
                  {contact.read ? (
                    <div className="flex items-center space-x-1">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span>Read</span>
                    </div>
                  ) : (
                    <div
                      className="flex items-center space-x-1 cursor-pointer"
                      onClick={() => handleStatusToggle(contact.id)}
                    >
                      <XCircleIcon className="w-5 h-5 text-red-500" />
                      <span>Unread</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )

}