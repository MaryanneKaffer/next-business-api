"use client"
import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input } from "@heroui/react";
import { FaIdCard } from "react-icons/fa6";
import { IoBagHandleSharp } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { SearchIcon } from "@/components/searchIcon";
import ApiContent from "@/components/apiContent";
import { IoMdAdd } from "react-icons/io";
import SellingsTable from "@/components/sellingsTable";

export default function Home() {
  const keys = [{ icon: <FaIdCard />, content: "Customers" }, { icon: <MdOutlinePayments />, content: "Orders" }, { icon: <IoBagHandleSharp />, content: "Products" }];
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Select"]));
  const [value, setValue] = useState("")

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys],
  );

  return (
    <section className="flex flex-col gap-4 w-full h-full">
      <div className="flex gap-2">
        <span>
          <Dropdown className="text-2xl">
            <DropdownTrigger>
              <Button className="px-6 w-[145px] gap-1" size="lg" endContent={<FaCaretDown size={16} />}>
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Single selection example"
              selectedKeys={selectedValue}
              selectionMode="single"
              variant="flat"
              onSelectionChange={(keys) => {
                if (keys !== "all") {
                  setSelectedKeys(new Set(keys as Set<string>));
                  setValue(selectedValue)
                }
              }}          >
              {keys.map((item) => (
                <DropdownItem startContent={item.icon} key={item.content}>{item.content}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </span>
        <Button className="px-1 gap-1 w-fit" color="primary" size="lg" endContent={<IoMdAdd size={20} />}>
          New
        </Button>
        <Input
          isClearable
          classNames={{
            label: "text-black/50 dark:text-white/90",
            inputWrapper: [
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
            ],
          }}
          className="w-full"
          placeholder="Type to search..."
          radius="lg"
          size="lg"
          startContent={<SearchIcon />}
        />
      </div>
      <div className="flex gap-2 w-full h-full">
        <SellingsTable />
        <ApiContent type={value} />
      </div>
    </section >
  );
}

