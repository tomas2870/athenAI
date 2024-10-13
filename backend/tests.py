import requests
from questions import convert_questions_to_preprompt

SAMPLE_QUESTION_DATA = {
    "list_of_questions": [
  {
    "question": "Tell me about yourself.",
    "response": "Hi, I'm Alex, a high school junior. I'm passionate about computer science and enjoy coding in Python. I’m also involved in my school's robotics team."
  },
  {
    "question": "What are your academic goals after high school?",
    "response": "I want to major in computer science, focusing on AI and machine learning. I'm aiming to get into a top-tier university and eventually work at a tech company like Google or start my own tech business."
  },
  {
    "question": "What subjects are you currently struggling with, if any?",
    "response": "Math is a bit challenging for me, especially calculus, but I’m working on improving with the help of online resources and a tutor."
  },
  {
    "question": "Do you participate in any extracurricular activities?",
    "response": "Yes, I'm part of the robotics team, and I also play soccer. I like how robotics allows me to apply what I learn in class, and soccer helps me stay active and work as part of a team."
  },
  {
    "question": "Have you thought about any specific colleges you'd like to apply to?",
    "response": "Yes, I’m looking at schools like MIT, Stanford, and Carnegie Mellon because of their strong computer science programs and innovation-driven culture."
  },
  {
    "question": "Do you have a plan to make your application stand out?",
    "response": "I’m planning to showcase my leadership skills from robotics, as well as a machine learning project I’ve been working on. I’m also trying to develop a strong personal statement that highlights my passion for solving real-world problems through technology."
  },
  {
    "question": "What direction do you want to go with your college essay?",
    "response": "I want to write about my experience leading the robotics team and how it taught me problem-solving and leadership skills, but I'm also thinking about discussing how I’ve used coding to help local businesses automate their processes."
  },
  {
    "question": "What are you struggling with in your essay right now?",
    "response": "I'm struggling with making my essay sound unique. I feel like a lot of people have similar experiences with leadership and tech, so I’m not sure how to make mine stand out."
  }
]
}

SAMPLE_ESSAY_DATA = {
  "list_of_questions": [
    {
      "question": "Tell me about yourself.",
      "response": "Hi, I'm Alex, and I have a deep passion for both music and engineering. I enjoy playing piano and exploring the emotional landscapes that music can create. I also love problem-solving, especially when it involves creative applications in fields like electrical engineering and artificial intelligence."
    },
    {
      "question": "What are your academic goals after high school?",
      "response": "I aim to pursue a dual degree in music and electrical engineering. I'm particularly interested in studying how technology can enhance musical experiences and in designing specialized processors for neural networks to process and generate music. I want to attend a university where I can explore both my musical and technical interests in-depth."
    },
    {
      "question": "What subjects are you currently struggling with, if any?",
      "response": "While I find calculus fascinating, there are times when it can be challenging, especially when it comes to applying it to physical concepts. However, I enjoy working through these challenges and using them to enhance my understanding of engineering principles."
    },
    {
      "question": "Do you participate in any extracurricular activities?",
      "response": "Yes, I’m very involved in music. I volunteer to teach piano to younger students and help organize music performances in my community. Additionally, I’ve been part of virtual performances and have arranged ensemble pieces to bring people together during difficult times."
    },
]
}

SAMPLE_ESSAY_DATA['essay'] = """
The rippling arpeggios and beautiful sonorities of Ravel’s Miroirs are captivating; playing them and being in that moment gives me a sense of greater existence. When a piece of music no longer takes effort but simply flows through oneself, it creates an indescribable feeling that, combined with the passion of the intense emotional landscapes so carefully crafted by a composer, are invigorating. For me, music and especially piano, makes me come alive. 

Further than just playing music is my desire to instill that passion to someone else. The sudden elation I see when I help someone realize that not everything has to be difficult — to see that someone is able to not just hear a piece of music, but to truly listen and understand music — this is what inspires me to teach others, to learn.  I’ve volunteered to teach several students, and through showing students the theory behind pieces they enjoyed and teaching them the technical necessities to learn gradually more advanced pieces, I helped several students find a passion for music. When I received a letter from one student’s mother telling me what a significant impact I had made on his desire to pursue music, I was inspired to do more for my community and seek out more ways to teach others and learn from others. 

I believe that through music we can improve one another and the world. To bring some joy and sense of community to local retirement homes during the pandemic, I arranged and edited several videos of Ashbury musicians including duets between myself and other students performed virtually. In addition to this, I helped several friends through accompaniment and other assistance in the form of performances both at school and at local competitions. Even through this pandemic, I’ve continued to arrange ensemble performances of pieces. Music has the ability to soothe, enliven, and bring people together. While our communities may seem isolated due to the pandemic, by organizing virtual music performances and ensembles I’ve sought to bring a bit of joy and liveliness back to our world. 

At BU, I will bring with me these experiences and my desire to help others find what makes them come alive. Whether this is playing music, understanding music, or just listening to a wonderful piece, I hope my future contributions at BU will help someone else feel this. The beauty and passion I feel is not limited solely to music. I experience that same rush, that same energy when, for example, using integration to derive the volume of a cone and extending this to any similarly defined solid. It’s the application of abstract concepts and creative problem solving that I feel is so important to both music and engineering, and BU is the perfect combination of a conservatory-style music education and a rigorous exploration of electrical engineering. 

While I have many passions, one thing I ultimately hope to accomplish at BU, whether as an undergraduate or a postdoctoral student, is to design more effective specialized processors for the usage of existing neural network infrastructures to process and create generative models for various forms of music. The research opportunities, emphasis on both music and electrical engineering, and increased emphasis on data processing and deep learning at BU make a perfect combination for what I hope to achieve. Through my studies in BU’s dual degree program, I can integrate my passions together and pursue everything that makes me come alive. 
"""

def test_convert_question():
    print(convert_questions_to_preprompt(SAMPLE_QUESTION_DATA))

host = 'https://athena-prep-c5612b45416c.herokuapp.com'
# host = 'http://127.0.0.1:5000/'

def test_api(path: str, data: dict):
    response = requests.post(host + path, json=data, stream=True, timeout=600)

    if response.status_code == 200:
        print("Streaming response:")
        for chunk in response.iter_content(chunk_size=None):
            if chunk:
                print(chunk.decode('utf-8'), end='')  # Decode and print each chunk
    else:
        print(f"Request failed with status code: {response.status_code}")

def test_generate_essay_outline():
    test_api('generate_essay_outline', SAMPLE_QUESTION_DATA)

def test_essay_feedback():
    test_api('essay_feedback', SAMPLE_ESSAY_DATA)

if __name__ == '__main__':
    test_essay_feedback()


