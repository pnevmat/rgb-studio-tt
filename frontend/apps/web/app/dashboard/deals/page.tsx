"use client"

import { useEffect, useState, useCallback } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../../packages/ui/src/components/table";
import { Badge } from "../../../../../packages/ui/src/components/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../packages/ui/src/components/select";
import { Button } from "../../../../../packages/ui/src/components/button";
import { X } from "lucide-react";
import { CreateDealDialog } from "../../components/create-deal-dialog";
import { EditDealDialog } from "../../components/edit-deal-dialog";
import { DeleteAction } from "../../components/delete-action";

export default function DealsPage() {
  const [deals, setDeals] = useState<any[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [loading, setLoading] = useState(true)
  const [deleted, setDeleted] = useState(false)

  const fetchDeals = useCallback(async () => {
    setLoading(true)
    try {
      // Формируем URL: если выбран статус, добавляем query-параметр
      const url = statusFilter !== "ALL" 
        ? `http://localhost:3000/deals?status=${statusFilter}`
        : "http://localhost:3000/deals"
        
      const res = await fetch(url)
      const data = await res.json()
      setDeals(data)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => { fetchDeals() }, [])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      WON: "bg-green-500 hover:bg-green-600",
      LOST: "bg-red-500 hover:bg-red-600",
      IN_PROGRESS: "bg-blue-500 hover:bg-blue-600",
      NEW: "bg-gray-500 hover:bg-gray-600",
    }
    return colors[status] || "bg-gray-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Deals</h2>
        <CreateDealDialog onDealCreated={fetchDeals} />
      </div>

       <div className="flex items-center gap-4 bg-card p-4 rounded-lg border">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Filter by Status:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="WON">Won</SelectItem>
              <SelectItem value="LOST">Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {statusFilter !== "ALL" && (
          <Button 
            variant="ghost" 
            onClick={() => setStatusFilter("ALL")}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
        </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium">{deal.title}</TableCell>
                <TableCell>{deal.client?.name || "Deleted Client"}</TableCell>
                <TableCell>${Number(deal.amount).toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(deal.status)}>{deal.status}</Badge>
                </TableCell>
                <TableCell>{new Date(deal.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <EditDealDialog 
                            deal={deal} 
                            onDealUpdated={fetchDeals} 
                        />
                    </div>
                </TableCell>
                <TableCell className="text-right">
                    <DeleteAction id={deal.id} entity='deals' onDeleted={setDeleted} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}