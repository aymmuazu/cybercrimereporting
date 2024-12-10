<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:6|different:current_password|confirmed',
        ]);

        $user = auth()->user();
        if (!Hash::check($request->input('current_password'), $user->password)) {
            return response()->json(['error' => 'The current password is incorrect.'], 422);
        }
        $user->password = bcrypt($request->input('new_password'));
        $user->save();

        return response()->json(['message' => 'Password updated successfully.'], 200);
    }

    public function addReport(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'incident_date' => 'required|date',
            'location' => 'required|string|max:255',
            'evidence' => 'nullable|file|mimes:jpg,png,pdf,doc,docx',
            'contact' => 'nullable|string|max:255',
        ]);

        $report = new Report();
        $report->title = $validatedData['title'];
        $report->description = $validatedData['description'];
        $report->category = $validatedData['category'];
        $report->incident_date = $validatedData['incident_date'];
        $report->location = $validatedData['location'];
        $report->contact = $validatedData['contact'] ?? null;
        $report->user_id = auth()->user()->id;

        if ($request->hasFile('evidence')) {
            $report->evidence = $request->file('evidence')->store('public/evidence');
        }

        $report->save();

        return response()->json(['message' => 'Report submitted successfully.']);   
    }

    public function getReport()
    {
        $reports = Report::where('user_id', auth()->user()->id)->get();

        return response()->json([
            'message' => 'Reports retrieved successfully.',
            'reports' => $reports
        ]);   

    }

    public function getAllReport()
    {
        $reports = Report::with('user')->orderBy('id', 'desc')->get();
        $reportsWithUserEmails = $reports->map(function ($report) {
            $reportArray = $report->toArray(); 
            return $reportArray;
        });

        return response()->json([
            'message' => 'All Reports retrieved successfully.',
            'reports' => $reportsWithUserEmails
        ]);
    }



    public function getSingleReport($id)
    {
        $report = Report::where('id', $id)
                        //->where('user_id', auth()->user()->id)
                        ->first();
                            
        if (!$report) {
            return response()->json([
                'message' => 'No Report found.',
            ], 500);    
        }

        $fileUrl = Storage::url($report->evidence);
        
        return response()->json([
            'message' => 'Report retrieved successfully.',
            'report' => $report,
            'evidenceURL' => $fileUrl
        ]);   

    }

    public function deleteReport(Request $request, $deleteReportId)
    {
        $report = Report::find($deleteReportId);
        if (!$report) {
            return response()->json([
                'message' => 'Report already deleted or not found.',
            ]);
        }
        $report->delete();
        return response()->json([
            'message' => 'Report deleted successfully.',
        ], 200);
    }

    public function editReport(Request $request)
    {
        $report = Report::where('user_id', auth()->user()->id)
                        ->where('id', $request->id)
                        ->first();
        
        if (!$report) {
            return response()->json([
                'message' => 'No Report found.',
            ], 404);    
        }

        // Update the report fields
        $report->title = request('title', $request->title);
        $report->description = request('description', $request->description);
        $report->category = request('category', $request->category);
        $report->incident_date = request('incident_date', $request->incident_date);
        $report->location = request('location', $request->location);

        if ($request->hasFile('evidence')) {
            $report->evidence = $request->file('evidence')->store('public/evidence');
        }

        $report->contact = request('contact', $request->contact);
        $report->save();

        return response()->json([
            'message' => 'Report updated successfully.',
            'report' => $report
        ]);
    }


}
