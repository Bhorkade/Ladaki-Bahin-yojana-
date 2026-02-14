// Initialize data from localStorage or use default
let cases = JSON.parse(localStorage.getItem('fraudCases')) || [
    {
        name: "Priya Sharma",
        id: "FD001",
        risk: "High Risk",
        confidence: 85,
        status: "Under Review"
    },
    {
        name: "Anjali Patel",
        id: "FD002",
        risk: "Medium Risk",
        confidence: 45,
        status: "Verified"
    },
    {
        name: "Sunita Devi",
        id: "FD003",
        risk: "Low Risk",
        confidence: 15,
        status: "Approved"
    },
    {
        name: "Kavita Singh",
        id: "FD004",
        risk: "High Risk",
        confidence: 92,
        status: "Flagged"
    }
];

// Save to localStorage
function saveCases() {
    localStorage.setItem('fraudCases', JSON.stringify(cases));
}

// Update statistics
function updateStats() {
    const total = cases.length;
    const fraud = cases.filter(c => c.status === "Flagged").length;
    const verified = cases.filter(c => c.status === "Verified").length;
    const review = cases.filter(c => c.status === "Under Review").length;
    
    document.getElementById('totalApps').textContent = total;
    document.getElementById('fraudDetected').textContent = fraud;
    document.getElementById('verifiedCases').textContent = verified;
    document.getElementById('underReview').textContent = review;
}

// Render cases list
function renderCases() {
    const casesList = document.getElementById('casesList');
    
    if (cases.length === 0) {
        casesList.innerHTML = '<div style="padding: 2rem; text-align: center; color: #666;">No cases found. Add a new case to get started.</div>';
        return;
    }
    
    casesList.innerHTML = cases.map((caseItem, index) => `
        <div class="case-item">
            <div class="case-info">
                <div class="case-name">${caseItem.name}</div>
                <div class="case-id">ID: ${caseItem.id}</div>
            </div>
            <span class="case-risk risk-${caseItem.risk.toLowerCase().replace(' ', '-')}">${caseItem.risk}</span>
            <div class="case-confidence">
                <div>Confidence: ${caseItem.confidence}%</div>
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${caseItem.confidence}%"></div>
                </div>
            </div>
            <span class="case-status status-${caseItem.status.toLowerCase().replace(' ', '-')}">${caseItem.status}</span>
            <div class="case-actions">
                <button class="btn-action btn-review">Review</button>
                <button class="btn-action btn-investigate">Investigate</button>
                <button class="btn-action btn-delete" onclick="deleteCase(${index})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Show add form modal
function showAddForm() {
    document.getElementById('addModal').style.display = 'block';
}

// Close add form modal
function closeAddForm() {
    document.getElementById('addModal').style.display = 'none';
    document.getElementById('addCaseForm').reset();
}

// Add new case
function addCase(event) {
    event.preventDefault();
    
    const newCase = {
        name: document.getElementById('caseName').value,
        id: document.getElementById('caseId').value,
        risk: document.getElementById('caseRisk').value,
        confidence: parseInt(document.getElementById('caseConfidence').value),
        status: document.getElementById('caseStatus').value
    };
    
    cases.unshift(newCase);
    saveCases();
    renderCases();
    updateStats();
    closeAddForm();
}

// Delete case
function deleteCase(index) {
    if (confirm('Are you sure you want to delete this case?')) {
        cases.splice(index, 1);
        saveCases();
        renderCases();
        updateStats();
    }
}

// Toggle AI Assistant
function toggleAssistant() {
    const modal = document.getElementById('assistantModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// AI Assistant responses
const aiResponses = {
    "How to detect fake documents?": "To detect fake documents in the Ladli Behen Yojana system:\n\n1. Verify document authenticity using government databases\n2. Check for watermarks, holograms, and security features\n3. Cross-reference information with Aadhaar and other official records\n4. Use AI-powered image analysis to detect tampering\n5. Verify signatures and stamps with issuing authorities\n6. Check document serial numbers and dates for consistency\n\nOur system uses advanced ML algorithms to automatically flag suspicious documents with 92% accuracy.",
    
    "What are common fraud patterns?": "Common fraud patterns detected in benefit schemes:\n\n1. Duplicate Applications - Same person applying multiple times with different IDs\n2. Identity Theft - Using stolen documents of genuine beneficiaries\n3. Fake Documents - Forged income certificates, residence proofs\n4. Ghost Beneficiaries - Applications for non-existent persons\n5. Ineligible Claims - Not meeting age, income, or residency criteria\n6. Document Tampering - Altered dates, amounts, or signatures\n\nOur AI system monitors these patterns in real-time and flags suspicious cases for manual review.",
    
    "How to verify beneficiary data?": "Beneficiary data verification process:\n\n1. Aadhaar Verification - Validate identity through UIDAI database\n2. Bank Account Validation - Verify account ownership and status\n3. Income Certificate Check - Cross-reference with revenue department\n4. Residence Proof - Validate address through utility bills or ration card\n5. Family Details - Verify family composition and relationships\n6. Biometric Authentication - Fingerprint or iris scan matching\n\nAll verifications are logged in our audit trail for compliance purposes.",
    
    "What documents are required?": "Required documents for Ladli Behen Yojana:\n\n1. Aadhaar Card (mandatory)\n2. Bank Account Details with passbook copy\n3. Income Certificate (not exceeding ₹2.5 lakh annually)\n4. Residence Proof (electricity bill, ration card, or voter ID)\n5. Age Proof (birth certificate or school certificate)\n6. Passport-size photographs\n7. Self-declaration form\n8. Family composition certificate\n\nAll documents must be valid and issued by authorized government agencies.",
    
    "How to report suspected fraud?": "To report suspected fraud:\n\n1. Click 'Investigate' button on the suspicious case\n2. Document your findings with evidence\n3. Use the 'Flag' status to mark high-priority cases\n4. Submit detailed report through the system\n5. Contact local authorities if immediate action needed\n6. Follow up through the case tracking system\n\nAll reports are confidential and protected under whistleblower guidelines. You can also call our fraud helpline: 1800-XXX-XXXX",
    
    "Data compliance guidelines": "Data Compliance Guidelines:\n\n1. GDPR Compliance - Full adherence to European data protection standards\n2. Data Encryption - AES-256 encryption for all stored data\n3. Access Control - Role-based permissions with multi-factor authentication\n4. Audit Logging - Complete trail of all data access and modifications\n5. User Consent - Explicit consent required for data collection\n6. Data Retention - Automatic deletion after statutory period\n7. Privacy by Design - Built-in privacy protections\n8. Regular Audits - Quarterly security assessments\n\nOur compliance score is 98.5% with zero data breaches recorded."
};

// Ask predefined question
function askQuestion(question) {
    const chatBox = document.getElementById('chatBox');
    const currentTime = new Date().toLocaleTimeString();
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.innerHTML = `<div class="message-time">${currentTime}</div>${question}`;
    chatBox.appendChild(userMessage);
    
    // Simulate typing delay
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot';
        const response = aiResponses[question] || "I'm here to help! Please ask me about fraud detection, compliance, or system usage.";
        botMessage.innerHTML = `<div class="message-time">${new Date().toLocaleTimeString()}</div>${response.replace(/\n/g, '<br>')}`;
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);
    
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send custom message
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const chatBox = document.getElementById('chatBox');
    const currentTime = new Date().toLocaleTimeString();
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.innerHTML = `<div class="message-time">${currentTime}</div>${message}`;
    chatBox.appendChild(userMessage);
    
    input.value = '';
    
    // Check if message matches a predefined question
    let response = null;
    for (let question in aiResponses) {
        if (message.toLowerCase().includes(question.toLowerCase().substring(0, 10))) {
            response = aiResponses[question];
            break;
        }
    }
    
    // Simulate typing delay
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot';
        const botResponse = response || "Thank you for your question! For specific queries about fraud detection, document verification, compliance guidelines, or reporting procedures, please use the quick questions above or contact our support team at support@ladlibehen.gov.in";
        botMessage.innerHTML = `<div class="message-time">${new Date().toLocaleTimeString()}</div>${botResponse.replace(/\n/g, '<br>')}`;
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);
    
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle Enter key in chat input
function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const addModal = document.getElementById('addModal');
    const assistantModal = document.getElementById('assistantModal');
    
    if (event.target === addModal) {
        closeAddForm();
    }
    if (event.target === assistantModal) {
        toggleAssistant();
    }
}

// Show/Hide sections based on navigation
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Add active class to clicked nav link
    event.target.classList.add('active');
    
    // Update reports if on reports page
    if (sectionName === 'reports') {
        updateReports();
    }
    
    // Render all cases if on detection page
    if (sectionName === 'detection') {
        renderAllCases();
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Render all cases for detection page
function renderAllCases() {
    const allCasesList = document.getElementById('allCasesList');
    
    if (!allCasesList) return;
    
    if (cases.length === 0) {
        allCasesList.innerHTML = '<div style="padding: 2rem; text-align: center; color: #666;">No cases found. Add a new case to get started.</div>';
        return;
    }
    
    allCasesList.innerHTML = cases.map((caseItem, index) => `
        <div class="case-item">
            <div class="case-info">
                <div class="case-name">${caseItem.name}</div>
                <div class="case-id">ID: ${caseItem.id}</div>
            </div>
            <span class="case-risk risk-${caseItem.risk.toLowerCase().replace(' ', '-')}">${caseItem.risk}</span>
            <div class="case-confidence">
                <div>Confidence: ${caseItem.confidence}%</div>
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${caseItem.confidence}%"></div>
                </div>
            </div>
            <span class="case-status status-${caseItem.status.toLowerCase().replace(' ', '-')}">${caseItem.status}</span>
            <div class="case-actions">
                <button class="btn-action btn-review">Review</button>
                <button class="btn-action btn-investigate">Investigate</button>
                <button class="btn-action btn-delete" onclick="deleteCase(${index})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Update reports statistics
function updateReports() {
    const total = cases.length;
    const fraud = cases.filter(c => c.status === "Flagged").length;
    const verified = cases.filter(c => c.status === "Verified" || c.status === "Approved").length;
    
    const fraudRate = total > 0 ? ((fraud / total) * 100).toFixed(1) : 0;
    const successRate = total > 0 ? ((verified / total) * 100).toFixed(1) : 0;
    
    const monthlyTotalEl = document.getElementById('monthlyTotal');
    const fraudRateEl = document.getElementById('fraudRate');
    const successRateEl = document.getElementById('successRate');
    
    if (monthlyTotalEl) monthlyTotalEl.textContent = total;
    if (fraudRateEl) fraudRateEl.textContent = fraudRate + '%';
    if (successRateEl) successRateEl.textContent = successRate + '%';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderCases();
    updateStats();
    updateReports();
    renderAllCases();
});
