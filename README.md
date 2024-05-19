# <p align="center">Trev</p>
![211shots_so](https://github.com/shrey-v0/trev.ai/assets/165524661/a249fd5b-22d8-4f7f-aa4b-adeb476ab3c1)

Trev seeks to redefine the approach to Understanding and Optimizing Engineering Operations for teams. This involves gaining deep insights into developers' needs and challenges. To achieve this, Trev considers various factors that can contribute to developer burnout, as well as key metrics that enhance organizational performance.



##  Features    
- Engineering Metrics like DORA and Cycle Time
- A robust team members segment to get detailed information about each developer
- Incidents dashboard focusing product health


## Getting Started

1. **Install Dependencies**: Run the following command at the root level to install all dependencies:

    ```bash
    pnpm install
    ```

2. **Set Environment Variables**: Add the following env `DATABASE_URL`, to your environment configuration (`neon database url`)

3. **[Database Setup](https://github.com/shrey-v0/trev.ai/tree/master/packages/db#database-setup)**: 
    - Navigate to the `packages/db` directory.
    - Run the following commands to generate migrations, apply migrations, and seed the database:

    ```bash
    pnpm generate
    pnpm migrate
    pnpm seed
    ```

    For detailed instructions on database setup, refer to [Database Setup](https://github.com/shrey-v0/trev.ai/tree/master/packages/db#database-setup).

4. **Spin up the turbo repo**:

    ```bash
    turbo dev
    ```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.



## Key Concepts Involved
  
     
### DORA Metrics: Enhancing Software Delivery Performance


![image](https://github.com/shrey-v0/trev.ai/assets/165524661/1b64d436-a2c9-40ca-9383-86b24fa12cf0)

DORA (DevOps Research and Assessment) metrics serve as vital indicators for evaluating and enhancing an organization's DevOps practices and software delivery performance. Developed by the DORA team, now part of Google Cloud, these metrics provide insights into key areas of improvement and efficiency. Let's delve into the four core DORA metrics:

#### Deployment Frequency

Deployment Frequency measures how frequently code is deployed in production. A high deployment frequency indicates agility and responsiveness to customer needs, fostering innovation and competitiveness. Conversely, a low frequency may reveal process bottlenecks. Optimizing deployment frequency enables swift adaptation to market demands and enhances software delivery.

#### Lead Time for Change

Lead Time for Change signifies the duration from the first commit to deployment in the final environment. Short lead times reflect streamlined development processes, facilitating rapid adaptation to market changes. Lengthy lead times indicate inefficiencies hindering innovation. Optimization of lead time accelerates software delivery, boosts customer satisfaction, and sustains competitiveness.

#### Change Failure Rate

Change Failure Rate evaluates the proportion of changes resulting in errors or defects. High failure rates signal inadequate testing or quality control, leading to disruptions and dissatisfaction. Conversely, a low failure rate indicates robust processes. Tracking and reducing failure rates enhance software quality, minimize downtime, and foster customer trust.

#### Mean Time to Recovery (MTTR)

MTTR measures the average time to restore normal operations after an incident. A low MTTR reflects efficient incident response, minimizing disruptions and customer impact. Conversely, a high MTTR suggests delays and inefficiencies. Improving MTTR enhances resilience, minimizes service disruptions, and elevates customer satisfaction, bolstering competitiveness.

These metrics offer actionable insights into software delivery performance, guiding organizations towards greater efficiency, reliability, and customer satisfaction in today's dynamic digital landscape. Tracking and optimizing these metrics empower companies to stay ahead in an increasingly competitive market.


### Engineering Metrics and Cycle Time


![image](https://github.com/shrey-v0/trev.ai/assets/165524661/f324a3fc-2402-47c5-a731-5687ff9734c2)

Cycle time is a pivotal metric in engineering, particularly in software development. It quantifies the duration a work item spends traversing through different phases of the development process.

#### Formula:

```Cycle Time = Waiting Time + Coding Time + Pickup Time + Merge Time + Deploy Time```

#### Definitions:

1. *Waiting Time:*
   - Duration from issue creation to the first commit.
   - *Formula:* `Waiting Time = First_Commit_Time - Creation_Time`

2. *Coding Time:*
   - Time from the first commit to the pull request.
   - *Formula:* `Coding Time = Pull_Request_Time - First_Commit_Time`

3. *Pickup Time:*
   - Duration from pull request issuance to review initiation.
   - *Formula:* `Pickup Time = Review_Start_Time - Pull_Request_Issuance_Time`

4. *Merge Time:*
   - Time taken for code review and merging.
   - *Formula:* `Merge Time = Merge_Time - Review_Start_Time`

5. *Deploy Time:*
   - Time taken for code deployment post-merge.
   - *Formula:* `Deploy Time = Deployment_Time - Merge_Time`

#### Additional Metrics:

- *PR Cycle Time:*
  - Time taken to merge a pull request.
  - *Formula:* `PR Cycle Time = Merge_Time - Pull_Request_Issuance_Time`

- *Lead Time for Change:*
  - Duration from code commit to successful deployment.
  - *Formula:* `Lead Time for Change = Deployment_Time - First_Commit_Time`
