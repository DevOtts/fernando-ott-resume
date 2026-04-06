# Fernando Ott — Technical Knowledge & Opinions

## AI Architecture Philosophy

Fernando builds platforms, not one-off automations. The core principle: if adding a new client or use case requires custom engineering, the architecture is wrong. Brain at 8 Figure Agency is the best example — adding a new client to Brain is configuration, not code.

Multi-tenant isolation is critical in production AI systems. You cannot share context between clients, but you can share infrastructure, patterns, and the orchestration layer.

## LLM Orchestration Stack

Fernando's current production stack for LLM orchestration:
- LangChain for RAG pipelines, chain composition, and tool use
- LangSmith for observability and evaluation
- CrewAI for multi-agent workflows where agents need to hand off tasks
- MCP Server for standardized model-context protocol integrations
- OpenRouter as the LLM gateway for model flexibility
- Supabase pgvector for knowledge retrieval

He uses multiple LLMs in the same pipeline when needed. Not every step in a pipeline needs the most capable (and expensive) model. He routes based on task complexity.

## RAG Patterns

Fernando's approach to RAG in production:

Chunking strategy matters more than most people realize. Chunk size affects retrieval quality significantly. He typically uses 512-1024 token chunks with 20% overlap for general knowledge retrieval. For structured data or documents with clear sections, he adapts the chunking strategy.

Metadata on chunks is critical. Store source, section, date, and any other context that helps with filtering and ranking.

Hybrid search (vector + keyword) beats pure vector search in most production use cases. The BM25 component helps with exact matches that semantic search misses.

Re-ranking the top-k retrieved chunks before injection into the context window improves quality significantly.

## Multi-Agent Architecture

Fernando's view on multi-agent systems: agents should be specialized and hand off to each other based on task type. A generalist agent that tries to do everything is hard to debug and hard to improve.

In Brain, agents have specific roles: a research agent, a writing agent, a data retrieval agent, an integration agent. They communicate through structured handoffs.

Human-in-the-loop checkpoints are important for high-stakes decisions. Fernando built this into Cognia (the AI psychologist) with three validation checks before routing to a human.

## AWS Production Experience

Fernando has extensive hands-on AWS experience from his time at KeHE:
- Lambda for serverless compute
- SQS for decoupled message processing
- S3 for object storage and data pipelines
- DynamoDB for high-throughput, low-latency key-value storage
- OpenSearch for full-text and vector search
- CodeBuild for CI/CD pipelines
- CloudWatch for monitoring and alerting

He does not hold formal AWS certifications. His knowledge comes entirely from building production systems.

## Database Choices

Fernando's principles for database selection:

For knowledge retrieval: pgvector on Supabase or PostgreSQL for its flexibility, or a dedicated vector DB like Pinecone for scale.

For operational data: PostgreSQL for most relational data. MongoDB when schema flexibility and horizontal scaling matter more than transactional integrity.

For high-throughput key-value: DynamoDB or Redis.

He avoids premature database complexity. Start with PostgreSQL. Add specialized stores when you have a specific problem that PostgreSQL cannot solve efficiently.

## Frontend Philosophy

Fernando uses Next.js for most frontend work. He values:
- Server-side rendering for SEO and initial load performance
- TypeScript strict mode because runtime errors from type mismatches are expensive
- Component structure that makes the code readable for future team members
- Minimal JavaScript on the critical path

He is not a frontend specialist. He can build clean, performant UIs, but his strength is in the backend and AI orchestration layer.

## On Production AI

Three things Fernando learned from running AI in production:

1. Evaluation frameworks are not optional. You need automated evals to catch regressions when you update prompts or models. LangSmith is Fernando's primary tool for this.

2. Guardrails are a system design problem, not a prompt engineering problem. You need multiple layers: pre-LLM filters, post-LLM classifiers, and human escalation paths.

3. Latency matters. Users abandon slow AI interactions. Streaming responses is table stakes. Caching is important for common patterns.

## Fine-tuning

Fernando has done fine-tuning for domain adaptation. In Cognia, he fine-tuned models for specific personality profiles and domain knowledge in psychology. The approach: start with a base model, identify where it consistently fails on your specific use case, collect examples of correct behavior, fine-tune on those examples.

He does not fine-tune for general capability improvement. Base models are already very capable. Fine-tuning is most valuable for style adaptation, domain vocabulary, and reducing hallucination on specific knowledge.

## Observability

Fernando treats AI systems like any production system: you need metrics, logging, and alerting. His observability stack:
- LangSmith for LLM-specific tracing and evaluation
- Grafana for dashboards and visualization
- Datadog for infrastructure monitoring and log aggregation
- CloudWatch when everything is on AWS

He instruments every step of a pipeline. If something goes wrong in production, he wants to know exactly which step failed and why.

## What Fernando Thinks About the AI Landscape

Fernando is bullish on agentic AI systems but skeptical of the hype cycle. Most companies are still in the early stages of understanding how to use AI effectively. The teams that will win are the ones that focus on specific, measurable business problems rather than trying to automate everything at once.

He thinks MCP (Model Context Protocol) is an important standardization effort for AI integrations. He uses it in Brain.

He is not attached to any specific model provider. Different models have different strengths. Routing is a feature, not a workaround.
