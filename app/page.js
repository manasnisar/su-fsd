'use client'

import { useEffect, useState } from "react"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


export default function Home() {
  const [sortBy, setSortBy] = useState('created_at')
  const [files, setFiles] = useState([])

  useEffect(() => {
    async function getRes() {
      let res = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify({
          sort_by: sortBy
        })
      })
      res = await res.json()
      setFiles(res.sorted_files)
    }

    getRes()
  }, [sortBy])


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <main className="mx-auto max-w-sm flex flex-col mt-10">

      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Sort By {sortBy}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => setSortBy('created_at')}
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm cursor-pointer'
                    )}
                  >
                    Created At
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => setSortBy('a-z')}
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm cursor-pointer'
                    )}
                  >
                    A - Z
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => setSortBy('z-a')}
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm cursor-pointer'
                    )}
                  >
                    Z - A
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <div className="mt-10 flex flex-col gap-2">
        {
          files && files.map(file => (
            <div className="flex flex-col border-white bg-white text-black p-3 rounded-lg" key={file.createdAt}>
              <span>{file.createdAt}</span>
              <span>{file.filename}</span>
            </div>
          ))
        }
      </div>
    </main>

  )
}
