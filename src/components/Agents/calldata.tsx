'use client'
import React, { useState } from 'react'
import {  PhoneIncoming, PhoneOutgoing, ArrowLeft, Download, Calendar, Clock, User, Play, Pause, PhoneMissed } from 'lucide-react'
import { Phone, PhoneCall, Plus, PhoneOff } from 'lucide-react'

// Call history for a specific phone number
const phoneNumber = '+91-9876543210'
const contactName = 'John'
const callHistory = [
  {
    id: 1,
    callType: 'Incoming',
    audioUrl: '/recordings/call1.mp3',
    duration: '02:35',
    timestamp: '2025-07-03 10:15 AM',
    status: 'Completed',
    notes: 'Discussed project requirements'
  },
  {
    id: 2,
    callType: 'Incoming',
    audioUrl: '/recordings/call2.mp3',
    duration: '01:12',
    timestamp: '2025-07-02 05:42 PM',
    status: 'Completed',
    notes: 'Follow-up call'
  },
  {
    id: 3,
    callType: 'Incoming',
    audioUrl: '/recordings/call3.mp3',
    duration: '00:45',
    timestamp: '2025-07-01 02:30 PM',
    status: 'Missed Call',
    notes: ''
  },
  {
    id: 4,
    callType: 'Incoming',
    audioUrl: '/recordings/call4.mp3',
    duration: '05:22',
    timestamp: '2025-06-30 11:20 AM',
    status: 'Completed',
    notes: 'Initial consultation call'
  },
  {
    id: 5,
    callType: 'Incoming',
    audioUrl: '/recordings/call5.mp3',
    duration: '03:18',
    timestamp: '2025-06-29 03:45 PM',
    status: 'Completed',
    notes: 'Technical support query'
  },
  {
    id: 6,
    callType: 'Incoming',
    audioUrl: '/recordings/call6.mp3',
    duration: '00:32',
    timestamp: '2025-06-28 09:20 AM',
    status: 'Completed',
    notes: 'Quick check-in'
  }
]

const Calldata = () => {
  const [sortOrder, setSortOrder] = useState('desc')
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null)
  const [audioElements, setAudioElements] = useState<{ [key: number]: HTMLAudioElement }>({})

  const sortedCalls = [...callHistory].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime()
    const dateB = new Date(b.timestamp).getTime()
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
  })

  const handlePlayAudio = (callId: number, audioUrl: string) => {
    if (currentPlaying === callId) {
      // Pause current audio
      if (audioElements[callId]) {
        audioElements[callId].pause()
        setCurrentPlaying(null)
      }
    } else {
      // Stop any currently playing audio
      if (currentPlaying && audioElements[currentPlaying]) {
        audioElements[currentPlaying].pause()
      }
      
      // Play new audio
      if (!audioElements[callId]) {
        const audio = new Audio(audioUrl)
        audio.onended = () => setCurrentPlaying(null)
        setAudioElements(prev => ({ ...prev, [callId]: audio }))
        audio.play()
      } else {
        audioElements[callId].play()
      }
      setCurrentPlaying(callId)
    }
  }



  const totalCalls = callHistory.length
  const completedCalls = callHistory.filter(call => call.status === 'Completed').length
  const missedCalls = callHistory.filter(call => call.status === 'Missed Call').length
  const totalDuration = callHistory.reduce((total, call) => {
    if (call.status === 'Completed') {
      const [minutes, seconds] = call.duration.split(':').map(Number)
      return total + minutes * 60 + seconds
    }
    return total
  }, 0)

  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button className="p-2 hover:bg-gray-100 rounded border transition-colors">
            <ArrowLeft className="w-5 h-5 text-black" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-black">Call History</h1>
            <p className="text-gray-600">Conversation records and recordings</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border border-gray-300 rounded p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="border border-gray-300 p-4 rounded">
              <User className="w-8 h-8 text-black" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-black">{contactName}</h2>
              <p className="text-gray-600 font-mono">{phoneNumber}</p>
            </div>
            <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              Call Now
            </button>
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
  <div className="border border-gray-300 rounded-2xl p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">Total Calls</p>
        <p className="text-2xl font-bold text-black">{totalCalls}</p>
      </div>
      <div className="border border-gray-300 p-3 rounded-2xl bg-blue-100">
        <Phone className="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>

  <div className="border border-gray-300 rounded-2xl p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">Completed</p>
        <p className="text-2xl font-bold text-black">{completedCalls}</p>
      </div>
      <div className="border border-gray-300 p-3 rounded-2xl bg-green-100">
        <Plus className="w-6 h-6 text-green-600" />
      </div>
    </div>
  </div>

  <div className="border border-gray-300 rounded-2xl p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">Missed</p>
        <p className="text-2xl font-bold text-black">{missedCalls}</p>
      </div>
      <div className="border border-gray-300 p-3 rounded-2xl bg-red-100">
        <PhoneOff className="w-6 h-6 text-red-600" />
      </div>
    </div>
  </div>

  <div className="border border-gray-300 rounded-2xl p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">Total Duration</p>
        <p className="text-2xl font-bold text-black">{formatTotalDuration(totalDuration)}</p>
      </div>
      <div className="border border-gray-300 p-3 rounded-2xl bg-purple-100">
        <Clock className="w-6 h-6 text-purple-600" />
      </div>
    </div>
  </div>
</div>


        {/* Controls */}
        <div className="border border-gray-300 rounded p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-black">Call Records</h3>
              <select
                className="px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-black"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="desc">Latest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export All
            </button>
          </div>
        </div>

        {/* Call History Table */}
        <div className="border border-gray-300 rounded overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300">
                  Call Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300">
                  Call Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300">
                  Recording
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-b border-gray-300">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sortedCalls.map((call, index) => (
                <tr key={call.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium">
                    {index + 1}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center gap-2">
        {(call.callType)}
        <span className="text-sm text-black">{call.callType}</span>
      </div>
    </td> */}
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {call.callType === 'Incoming' ? (
                        <PhoneIncoming className="w-5 h-5 text-black" />
                      ) : (
                        <PhoneOutgoing className="w-5 h-5 text-black" />
                      )}
                      <span className="text-sm text-black font-medium">{call.callType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${call.status === 'Completed'
                        ? 'bg-white border-black text-black'
                        : 'bg-gray-100 border-gray-400 text-gray-700'}`}>
                      {call.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-black" />
                      <span className="text-sm text-black">{call.duration}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-black" />
                      <span className="text-sm text-black">{call.timestamp}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {call.status === 'Completed' ? (
                      <button
                        onClick={() => handlePlayAudio(call.id, call.audioUrl)}
                        className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                      >
                        {currentPlaying === call.id ? (
                          <Pause className="w-4 h-4 text-red-600" />
                        ) : (
                          <Play className="w-4 h-4 text-green-600" />
                        )}
                        <span className="text-sm text-black">
                          {currentPlaying === call.id ? 'Pause' : 'Play'}
                        </span>
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500">No recording</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-black">
                      {call.notes || '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border border-gray-300 border-t-0 rounded-b">
          <div className="text-sm text-black">
            Showing {sortedCalls.length} call records for {contactName}
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
              Next
            </button>
          </div>
        </div>

        {/* Empty State */}
        {callHistory.length === 0 && (
          <div className="text-center py-12 border border-gray-300 rounded">
            <Phone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No call history found for this number</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Calldata