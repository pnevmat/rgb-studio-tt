"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../../../../packages/ui/src/components/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../packages/ui/src/components/select";
import { Input } from "../../../../packages/ui/src/components/input";
import { Label } from "../../../../packages/ui/src/components/label";
import { Button } from "../../../../packages/ui/src/components/button";
import { Plus } from "lucide-react"

export function CreateDealDialog({ onDealCreated }: { onDealCreated: () => void }) {
  const [open, setOpen] = useState(false)
  const [clients, setClients] = useState<any[]>([])

  useEffect(() => {
    if (open) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/clients`)
        .then(res => res.json())
        .then(data => setClients(data))
    }
  }, [open])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    const payload = {
      title: formData.get("title"),
      amount: Number(formData.get("amount")),
      status: formData.get("status"),
      clientId: formData.get("clientId"),
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/deals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      setOpen(false)
      onDealCreated()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline"><Plus className="mr-2 h-4 w-4" /> New Deal</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <DialogHeader><DialogTitle>Create New Deal</DialogTitle></DialogHeader>
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input name="title" placeholder="Project Alpha" required />
          </div>
          <div className="grid gap-2">
            <Label>Amount ($)</Label>
            <Input name="amount" type="number" step="0.01" required />
          </div>
          <div className="grid gap-2">
            <Label>Client</Label>
            <Select name="clientId" required>
              <SelectTrigger><SelectValue placeholder="Select a client" /></SelectTrigger>
              <SelectContent>
                {clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select name="status" defaultValue="NEW">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="NEW">New</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="WON">Won</SelectItem>
                <SelectItem value="LOST">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter><Button type="submit">Create Deal</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}