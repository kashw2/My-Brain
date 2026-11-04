**Amazon Web Services** (AWS) is Amazon's public [[Cloud]] platform and the oldest of the big three alongside [[Azure]] and [[Google Cloud Platform]]. It has the same building blocks under different names: VMs (EC2), managed [[Kubernetes]] (EKS), serverless functions (Lambda) and managed databases like RDS for [[PostgreSQL]].

---

## How it Works

**Accounts**
The AWS account is the main boundary for permissions, billing and service limits, roughly what a subscription is in Azure. Companies usually run lots of accounts (prod, dev, one per team) grouped under AWS Organizations, which lines up with Azure management groups.

**IAM**
Identity and Access Management decides who can do what, using JSON policies attached to users, groups and roles. Workloads should assume a role and get short-lived credentials rather than holding long-lived access keys, the same idea as managed identities in Azure. People normally sign in through IAM Identity Center (SSO).

**Regions and Availability Zones**
A Region is a geographic area made up of several Availability Zones, each one or more separate datacentres with their own power and [[Networking|networking]]. Sydney is `ap-southeast-2`. Most services are regional, so spreading across AZs is the basic [[High Availability]] move.

**Containers**
EKS is managed Kubernetes, and EKS Auto Mode goes further by managing the nodes, load balancers and storage too, similar to AKS Automatic. ECS is AWS's own simpler container orchestrator, usually run on Fargate so there are no servers to look after. App Runner is closed to new customers, and AWS now points simple container apps at ECS Express Mode instead.

**When to Pick It**
Mostly when the team, the customer or the data already lives there. The services map closely to Azure (see the table below), so the concepts carry over and the real cost of switching is the tooling, the IAM model and the naming.

---

## Examples

| Need | Azure | AWS |
| --- | --- | --- |
| Virtual machines | Virtual Machines | EC2 |
| Managed Kubernetes | [[Azure Kubernetes Service]] | EKS |
| Serverless functions | [[Function App]] | Lambda |
| Web app hosting | [[App Service]] | Elastic Beanstalk |
| Containers without Kubernetes | Container Apps | ECS on Fargate |
| Managed PostgreSQL | [[Azure PostgreSQL]] | RDS for PostgreSQL, Aurora PostgreSQL |
| Object storage | Blob Storage | S3 |
| Identity and access | Entra ID, Azure RBAC | IAM, IAM Identity Center |

```bash
aws configure sso                # Sign in through IAM Identity Center
aws sts get-caller-identity      # Check which account and role you're using
aws ec2 describe-instances --region ap-southeast-2 --output table
aws s3 ls

# EKS Auto Mode cluster, then point kubectl at it
eksctl create cluster --name demo --region ap-southeast-2 --enable-auto-mode
aws eks update-kubeconfig --region ap-southeast-2 --name demo
```

---

### References

- [What is AWS](https://aws.amazon.com/what-is-aws/)
- [Microsoft Learn: Azure for AWS Professionals](https://learn.microsoft.com/en-us/azure/architecture/aws-professional/)
- [Wikipedia](https://en.wikipedia.org/wiki/Amazon_Web_Services)
