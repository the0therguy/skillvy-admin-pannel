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
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/24/outline";
import {useToast} from "@/hooks/use-toast";
import TypingAnimation from "@/components/ui/typing-animation";


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
        toast({description: "Something went wrong", variant: 'destructive'})
      } else {
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === contactId ? {...contact, read: true} : contact
          )
        );
        toast({description: "Updated successfully."});
      }

    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }

  const handleNoteUpdate = async (contactId, newNote) => {
    try {
      const response = await fetch(`${baseURL}contact-us-get/${contactId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({note: newNote}),
      });

      if (!response.ok) {
        toast({description: "Something went wrong", variant: 'destructive'})
      } else {
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === contactId ? {...contact, note: newNote} : contact
          )
        );
        toast({description: "Updated successfully."});
      }

    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <TypingAnimation
        className="mt-10 text-4xl font-bold text-black dark:text-white"
        text="Contact Us"
      />
      <hr/>
      {/*<h1 className="mt-10 text-4xl font-bold text-center">Contact Us</h1>*/}
      <div className="mt-10 w-[85%] mx-auto">
        <Table className="min-w-full border border-gray-300">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">First Name</TableHead>
              <TableHead className="text-center">Last Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Phone</TableHead>
              <TableHead className="text-center">Inquiry</TableHead>
              <TableHead className="text-center">Note</TableHead>
              <TableHead className="text-center">Read</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{contact.first_name}</TableCell>
                <TableCell className="text-center">{contact.last_name}</TableCell>
                <TableCell className="text-center">{contact.email}</TableCell>
                <TableCell className="text-center">{contact.phone}</TableCell>
                <TableCell className="text-center">{contact.inquiry}</TableCell>
                <TableCell className="text-center">
                  <input
                    type="text"
                    value={contact.note || ""}
                    onChange={(e) =>
                      setContacts((prevContacts) =>
                        prevContacts.map((c) =>
                          c.id === contact.id ? {...c, note: e.target.value} : c
                        )
                      )
                    }
                    onBlur={(e) => handleNoteUpdate(contact.id, e.target.value)}
                    className="w-full p-1 rounded text-center"
                    placeholder="Add a note"
                  />
                </TableCell>
                <TableCell className="text-center">
                  {contact.read ? (
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircleIcon className="w-5 h-5 text-green-500"/>
                      <span>Read</span>
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-center space-x-1 cursor-pointer"
                      onClick={() => handleStatusToggle(contact.id)}
                    >
                      <XCircleIcon className="w-5 h-5 text-red-500"/>
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