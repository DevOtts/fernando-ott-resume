# Fernando Ott — Frequently Asked Questions

## Career & Experience

**Q: What exactly is Brain?**
Brain is a multi-tenant AI platform I built at 8 Figure Agency. It connects to client business tools — CRMs, ad platforms, Slack, meeting tools, data warehouses — and uses a combination of vector stores, graph databases, and structured storage for retrieval. The orchestration layer is LangChain and CrewAI. I designed it so that adding a new client doesn't require custom code, just configuration. It has cut 20-30 hours of manual work per client per week.

**Q: How long have you been doing AI?**
I've been deploying AI in production for 4+ years. I started with applied ML at KeHE (search, recommendations, classification) and moved into LLM orchestration and agentic systems at 8 Figure Agency.

**Q: What makes you different from other AI engineers?**
Honestly, the business translation layer. Most AI engineers can build technically impressive systems. Fewer can sit with a client, understand their specific workflow, map AI to that workflow in a way that actually helps, and then deliver it on time. I've been doing that translation work since my KeHE days and I consider it one of my strongest skills.

**Q: Can you describe the KeHE project?**
KeHE is a NASDAQ-listed food distributor with $8B+ in annual revenue. I joined as Tech Lead and Architect to fix their e-commerce search. The system was slow — search results were taking too long and not finding the right products. I led the team through a POC, selected OpenSearch on AWS, and rebuilt the search platform. We went from a broken experience to a 14x speed improvement and a 2x lift in sales conversion. The system processes millions of queries daily. I also reduced their B2B client onboarding time from 15 minutes to 2 minutes.

**Q: Tell me about Polen.**
Polen was a startup I co-founded in 2013 in Curitiba, Brazil. The idea was a social impact Open API — a platform that let companies donate through purchases and micro-transactions. We were the first product like this in Latin America. I served as CEO for the first two years, then transitioned to CTO as the technical scaling challenges grew. We raised $550K in VC, scaled to 5,000+ companies and 25M+ end users, and processed $1.5M+ in donations. I managed about 20 people at peak. We went through accelerators in Chile, the UK, and Brazil. It was a 10+ year journey.

**Q: Why are you looking for a new role?**
I'm looking for the next chapter of my career. I've spent four years building AI systems that matter at 8 Figure Agency. I want to find a role where I can operate at the intersection of AI strategy, architecture, and team leadership — somewhere the AI work is central, not a feature. The right role matters more to me than moving quickly.

## Technical Questions

**Q: Which LLMs do you work with?**
I work with most of the major models: Claude (Anthropic), GPT-4 and its variants (OpenAI), Mistral, and LLaMA/Ollama for on-premise deployments. I use OpenRouter as a gateway so I can route to different models based on task requirements. I'm not attached to any specific provider.

**Q: How do you approach prompt engineering?**
I treat prompts as code. They go through version control, review, and testing. I use LangSmith to evaluate prompt changes before deploying them to production. My approach: write the simplest prompt that solves the problem, then iterate based on failure cases. I avoid over-engineering prompts.

**Q: How do you handle hallucinations?**
Multiple layers. The primary defense is retrieval-augmented generation — if the model is working from retrieved facts rather than its parametric memory, hallucination rates drop significantly. The second layer is output validation: I check that the model's response is consistent with the retrieved context. For high-stakes applications like Cognia, I added human-in-the-loop checkpoints.

**Q: What's your experience with vector databases?**
I've used Supabase pgvector extensively (it's what I use in Brain and this resume), Pinecone, and OpenSearch for vector search. My preference for most use cases is pgvector because it integrates cleanly with a PostgreSQL data model you probably already have. For very large scale, dedicated vector DBs have advantages.

**Q: How do you handle multi-tenancy in AI systems?**
The most important thing is context isolation. Tenant A's data never leaks into Tenant B's context, even if they're using the same retrieval infrastructure. I use metadata filtering at the vector search layer to enforce this. Each client in Brain has isolated knowledge, agent configurations, and context windows.

**Q: Do you have experience with fine-tuning?**
Yes. In Cognia I fine-tuned models for specific personality profiles and psychological domain knowledge. My approach: identify where the base model consistently fails for your specific use case, collect high-quality examples of correct behavior, fine-tune on those examples. I don't fine-tune for general capability — base models are already strong. Fine-tuning is most valuable for style adaptation, domain vocabulary, and reducing hallucination on specific knowledge.

## Gaps & Honest Answers

**Q: What are your gaps?**
I'll be direct about four areas. First, AI image and video generation — I understand diffusion models conceptually and can architect integrations, but I haven't built production pipelines with Stable Diffusion or video generation tools. Second, classical machine learning research — my ML work is applied: RAG, LLM orchestration, fine-tuning, multi-model routing. I don't train CNNs from scratch or write custom loss functions. Third, OCR and document processing — I haven't worked with OCR specifically, though I've built systems that solve analogous ingestion and classification problems. Fourth, AWS certifications — I have deep hands-on experience but no formal certs.

**Q: Are you a frontend developer?**
I can build clean, performant frontends with Next.js and React. I'm not a frontend specialist. My strongest work is in the backend, AI orchestration, and architecture layers.

**Q: Can you do pure data science work?**
Production AI engineering is my strength. I can build data pipelines, work with models, and implement evaluation frameworks. I'm not a data scientist in the traditional sense — I don't do statistical modeling, A/B test design, or advanced analytics as primary work.

## Work Style

**Q: How do you work with engineering teams?**
I set direction, not tasks. I define the architecture, the delivery standards, and the why behind technical decisions. I review code and give feedback. I trust the team to figure out the how. I try to protect the team from external noise while keeping them connected to the business outcome we're working toward.

**Q: How do you work with non-technical stakeholders?**
I translate. My job is to understand what they actually need (not what they say they need), map that to what technology can deliver, and set realistic expectations. I use concrete examples, not abstractions. I talk about outcomes, not features.

**Q: What's your management style?**
Direct feedback, frequent check-ins on blockers, and clear ownership. I don't like vague responsibilities. I've managed nearly 20 people and the biggest lesson I learned is that clarity is kindness — people perform better when they know exactly what good looks like.

**Q: What's the best AI project you've worked on?**
Brain. It's the most complete expression of what I think an AI platform should be: multi-tenant, multi-model, connected to real business data, with production-grade observability. The measure of its success is not how impressive the technology is but how much time it saves clients every week.

## Background

**Q: Tell me a fun fact about yourself.**
Before I was a software engineer, I was a songwriter. I recorded original music. You can find it on SoundCloud if you're curious. It was a different chapter of my life but it shaped how I communicate and think about problems.

**Q: What do you do outside of work?**
I run a YouTube channel called Devops Attempt where I teach AI systems and agent architectures in Portuguese. I enjoy teaching — explaining complex things clearly is a skill I care about. I have a daughter. I live in Curitiba, which has great parks and a solid tech community.
