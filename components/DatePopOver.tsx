"use client"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import React from 'react';

import { cn } from "@/lib/utils"
export default function DatePopover({ selectedDate, setSelectedDate }: any) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal w-full my-4",
                        !selectedDate && "text-muted-foreground"
                    )}
                    style={{backgroundColor: 'white'}}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Escoger la fecha de entrega</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                />
            </PopoverContent>
        </Popover>
    );
}
