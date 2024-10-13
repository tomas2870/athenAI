import React, { useState, useEffect, useRef } from 'react'

export default function TestEssayEditor() {
  const [responseText, setResponseText] = useState('')
  const [overallFeedbackResponseText, setOverallFeedbackResponseText] = useState('')
  const hasFetched = useRef(false)

  useEffect(() => {
    // Avoid duplicate fetch in Strict Mode
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchData = async () => {
      const essay_prompt = "Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story."
      const essay = "“Yo! I have an album I think you should check out,” stopping me on my way to the school bus, he showed me the cover of it on his phone. “This is The Caretaker - Everywhere At The End Of Time, it’s a 6-and-a-half hour album that tries to simulate the experience of dementia, it’s really cool.” “6 hours? That’s wild.” “Yeah, it kinda uses music to represent memories that slowly get distorted over the album.” “Woah.” “Yeah, you have no idea how hard this made me cry you NEED to check it out.” “Wait how did it make you cry?” “Just listen to it when you get the chance, in one sitting. Trust me, it’s amazing.” “Alright. I guess I’ll l check it out” I got on the school bus. It was a regular tradition for me and Avery to get together at the bus loop and briefly talk about music, it was fun showing each other what we have found. Unfortunately, this exchange happened on the last day before Spring Break 2020, we never saw each other in person again. The day after, I decided to check the album out. The concept of the album is simple: 6 stages, averaging around 65 minutes in length, each being parallel to a different stage of dementia. Stage 1 sets the stage with ballroom music, which is reused in later stages but increasingly distorted. By stage 4, it’s warped to the point where it’s practically incoherent, and in stage 6 it fades away to pure silence. End of album. From that, I didn’t expect it to really be bad, “it’s just distorted ballroom music, what could it do?” Oh, how wrong I was. The biggest surprise is that the audio ended up only being a small part of the experience, an ambient background in a canvas that was painted by my thoughts. Completely left to think on my own for 6 hours. At first, I thought about dementia, but eventually, this gradually moved into thoughts about memory itself, the passage of time, and the inevitability of it all. By late stage 4, it turned into an existential dread that continued to be intensified until the end of stage 6. By the end of the album, I lied in bed, in tears, absolutely terrified of… everything. It was absolutely soul-crushing, but at the same time I was just amazed at how audio made me feel such an intense emotion I’ve never felt before. The thoughts that came from this album carried on over the next few weeks. It felt as if my view of the world was completely changed somehow, and I ended up looking into it. I looked online at how different people felt about the album and eventually came across discussions around the concept of existentialism that really caught my attention. This ended up being a gateway into the world of philosophy. Doing more research on it over time, I ended up becoming an existentialist myself. Although existentialism sounds negative, I feel I ended up happier after learning about it. I felt more motivated to get work done and be productive in general. I felt happier spending time around others, and I would cherish the memories I have with people I used to know. I ended up realizing I should be myself more, and I came out to my family with my sexuality and I credit being able to do that to how I viewed being in the closet at that point. I really got to be more open and find out more about who I was. I find it funny how one of the biggest changes of who I am could be credited to Everywhere At The End Of Time, a 6.5-hour album about dementia. “it’s just distorted ballroom music, what could it do?” Oh, how happy I am to have been completely wrong here."
    
      const getAPIEndpoint = async (endpoint: string, setHook: React.Dispatch<React.SetStateAction<string>>) => {
        try {
            const response = await fetch(`/${endpoint}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ essay, essay_prompt })
            })
    
            if (!response.ok) {
              console.error('Response not ok:', response.statusText)
              return
            }
    
            const reader = response.body?.getReader()!
            const decoder = new TextDecoder('utf-8')
    
            let result = ''
            let done = false
    
            while (!done) {
              const { value, done: doneReading } = await reader.read()
              done = doneReading
              if (value) {
                const chunk = decoder.decode(value)
                result += chunk
                setHook((prev) => prev + chunk)
              }
            }
          } catch (error) {
            console.error('Error fetching data:', error)
          }
      }
      getAPIEndpoint('essay_feedback', setResponseText)

      getAPIEndpoint('essay_overall_feedback', setOverallFeedbackResponseText)
      
    }

    fetchData()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Test Essay Editor</h1>
      <p className="mb-2">Specific feedback:</p>
      <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{responseText}</pre>
      <p className="mb-2">Overall feedback:</p>
      <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{overallFeedbackResponseText}</pre>
    </div>
  )
}
