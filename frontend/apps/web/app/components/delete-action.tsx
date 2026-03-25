"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../packages/ui/src/components/alert-dialog";
import { Button } from "../../../../packages/ui/src/components/button";
import { Trash2 } from "lucide-react";
import {Dispatch, SetStateAction} from 'react';

interface DeleteActionProps {
  id: string
  entity: "clients" | "deals"
  data: Array<any>
  onDeleted: Dispatch<SetStateAction<any[]>>
}

export function DeleteAction({ id, entity, data, onDeleted }: DeleteActionProps) {
  const [loading, setLoading] = useState(false)
  
  async function onDelete() {
    console.log("Client id in delete function: ", id);
    
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${entity}/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        const deleted = await response.json();
        onDeleted(data.filter(item => item.email !== deleted.email))
      }
    } catch (error) {
      console.error(`Failed to delete ${entity}:`, error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. {entity === "clients" && "Deleting a client will also delete all associated deals."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onDelete} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}