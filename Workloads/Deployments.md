Deployments provide a way to provision pods in a Kubernetes cluster. A Deployment's orchestration methodology involves maintaining a set number of replicas across all nodes. A deployment is not usable in situation where state is to be persisted across Pod restarts.

# Pros

- Easy to set up
	- Only requires a small amount of Metadata and a PodTemplateSpec
- Attempts to ensure rollout across nodes

# Cons
- Ephemeral state / Stateless
	- Data is lost the on container termination
- Doesn't provide predictive termination of Pods